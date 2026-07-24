export type MealStatus =
  | 'planned'
  | 'cooking'
  | 'cooked'
  | 'eaten'
  | 'dining_out'
  | 'delivery'
  | 'convenience'
  | 'lunchbox'
  | 'skipped'
  | 'replaced'
  | 'cancelled'
  | 'archived';

export type MealEventType =
  | 'START_COOKING'
  | 'MARK_COOKED'
  | 'MARK_EATEN'
  | 'MARK_DINING_OUT'
  | 'MARK_DELIVERY'
  | 'MARK_CONVENIENCE'
  | 'MARK_LUNCHBOX'
  | 'SKIP_MEAL'
  | 'REPLACE_MEAL'
  | 'REVERT_LAST_ACTION';

export interface MealPlan {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  recipeId: string | null;
  servings: number;
  status: MealStatus;
  replacementGroupId?: string | null;
  replacedByMealPlanId?: string | null;
  previousMealPlanId?: string | null;
  inventoryTransactionId?: string | null;
  expenseId?: string | null;
  completedAt?: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventLog {
  id: string;
  entityType: 'meal_plan';
  entityId: string;
  eventType: string;
  previousState: MealStatus | null;
  nextState: MealStatus | null;
  occurredAt: string;
  actor: 'user' | 'system' | 'migration';
  payload: Record<string, unknown>;
  correlationId?: string | null;
  idempotencyKey: string;
  reversed: boolean;
  reversedByEventId?: string | null;
}

export interface TransitionResult {
  mealPlan: MealPlan;
  event: EventLog;
  sideEffects: Array<
    | { type: 'CONSUME_INVENTORY'; mealPlanId: string; recipeId: string; servings: number }
    | { type: 'REVERT_INVENTORY'; transactionId: string }
    | { type: 'OPTIONAL_EXPENSE_ENTRY'; category: 'dining_out' | 'delivery' | 'convenience' | 'lunchbox' }
    | { type: 'RECALCULATE_SHOPPING'; mealPlanId: string }
  >;
}

const allowedTransitions: Record<MealStatus, MealStatus[]> = {
  planned: [
    'cooking', 'cooked', 'dining_out', 'delivery',
    'convenience', 'lunchbox', 'skipped', 'replaced', 'cancelled',
  ],
  cooking: ['cooked', 'cancelled'],
  cooked: ['eaten'],
  eaten: [],
  dining_out: [],
  delivery: [],
  convenience: [],
  lunchbox: [],
  skipped: [],
  replaced: ['archived'],
  cancelled: ['archived'],
  archived: [],
};

function assertTransition(from: MealStatus, to: MealStatus): void {
  if (!allowedTransitions[from].includes(to)) {
    throw new Error(`Invalid meal transition: ${from} -> ${to}`);
  }
}

function targetStatus(eventType: MealEventType): MealStatus {
  switch (eventType) {
    case 'START_COOKING': return 'cooking';
    case 'MARK_COOKED': return 'cooked';
    case 'MARK_EATEN': return 'eaten';
    case 'MARK_DINING_OUT': return 'dining_out';
    case 'MARK_DELIVERY': return 'delivery';
    case 'MARK_CONVENIENCE': return 'convenience';
    case 'MARK_LUNCHBOX': return 'lunchbox';
    case 'SKIP_MEAL': return 'skipped';
    case 'REPLACE_MEAL': return 'replaced';
    default:
      throw new Error(`Event ${eventType} requires dedicated handling.`);
  }
}

export function transitionMeal(
  mealPlan: MealPlan,
  eventType: Exclude<MealEventType, 'REVERT_LAST_ACTION'>,
  options: {
    eventId: string;
    idempotencyKey: string;
    occurredAt: string;
    existingIdempotencyKeys: Set<string>;
    replacementMealPlanId?: string;
    replacementGroupId?: string;
  },
): TransitionResult {
  if (options.existingIdempotencyKeys.has(options.idempotencyKey)) {
    throw new Error('Duplicate meal action.');
  }

  const nextStatus = targetStatus(eventType);
  assertTransition(mealPlan.status, nextStatus);

  if (eventType === 'MARK_COOKED' && !mealPlan.recipeId) {
    throw new Error('Cannot mark cooked without a recipe.');
  }

  const updated: MealPlan = {
    ...mealPlan,
    status: nextStatus,
    version: mealPlan.version + 1,
    updatedAt: options.occurredAt,
    completedAt: ['cooked','eaten','dining_out','delivery','convenience','lunchbox','skipped']
      .includes(nextStatus)
      ? options.occurredAt
      : mealPlan.completedAt ?? null,
  };

  if (eventType === 'REPLACE_MEAL') {
    updated.replacedByMealPlanId = options.replacementMealPlanId ?? null;
    updated.replacementGroupId = options.replacementGroupId ?? null;
  }

  const sideEffects: TransitionResult['sideEffects'] = [];

  if (eventType === 'MARK_COOKED') {
    sideEffects.push({
      type: 'CONSUME_INVENTORY',
      mealPlanId: mealPlan.id,
      recipeId: mealPlan.recipeId!,
      servings: mealPlan.servings,
    });
  }

  if (eventType === 'MARK_DINING_OUT') {
    sideEffects.push({ type: 'OPTIONAL_EXPENSE_ENTRY', category: 'dining_out' });
  }
  if (eventType === 'MARK_DELIVERY') {
    sideEffects.push({ type: 'OPTIONAL_EXPENSE_ENTRY', category: 'delivery' });
  }
  if (eventType === 'MARK_CONVENIENCE') {
    sideEffects.push({ type: 'OPTIONAL_EXPENSE_ENTRY', category: 'convenience' });
  }
  if (eventType === 'MARK_LUNCHBOX') {
    sideEffects.push({ type: 'OPTIONAL_EXPENSE_ENTRY', category: 'lunchbox' });
  }
  if (eventType === 'REPLACE_MEAL') {
    sideEffects.push({ type: 'RECALCULATE_SHOPPING', mealPlanId: mealPlan.id });
  }

  const event: EventLog = {
    id: options.eventId,
    entityType: 'meal_plan',
    entityId: mealPlan.id,
    eventType,
    previousState: mealPlan.status,
    nextState: nextStatus,
    occurredAt: options.occurredAt,
    actor: 'user',
    payload: {},
    idempotencyKey: options.idempotencyKey,
    reversed: false,
  };

  return { mealPlan: updated, event, sideEffects };
}

export function canTransition(from: MealStatus, to: MealStatus): boolean {
  return allowedTransitions[from].includes(to);
}
