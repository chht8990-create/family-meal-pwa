import type { EventLog, MealPlan, MealStatus } from './meal-state-engine';

export interface UndoResult {
  mealPlan: MealPlan;
  reversalEvent: EventLog;
  sideEffects: Array<
    | { type: 'REVERT_INVENTORY'; transactionId: string }
    | { type: 'RECALCULATE_SHOPPING'; mealPlanId: string }
  >;
}

export function undoMealEvent(
  mealPlan: MealPlan,
  originalEvent: EventLog,
  options: {
    reversalEventId: string;
    idempotencyKey: string;
    occurredAt: string;
  },
): UndoResult {
  if (originalEvent.reversed) {
    throw new Error('Event has already been reversed.');
  }
  if (originalEvent.entityId !== mealPlan.id) {
    throw new Error('Event does not belong to this meal plan.');
  }
  if (!originalEvent.previousState) {
    throw new Error('Original state is unavailable.');
  }

  const previousState = originalEvent.previousState as MealStatus;
  const sideEffects: UndoResult['sideEffects'] = [];

  if (
    originalEvent.eventType === 'MARK_COOKED' &&
    mealPlan.inventoryTransactionId
  ) {
    sideEffects.push({
      type: 'REVERT_INVENTORY',
      transactionId: mealPlan.inventoryTransactionId,
    });
    sideEffects.push({
      type: 'RECALCULATE_SHOPPING',
      mealPlanId: mealPlan.id,
    });
  }

  const restored: MealPlan = {
    ...mealPlan,
    status: previousState,
    version: mealPlan.version + 1,
    updatedAt: options.occurredAt,
    completedAt: null,
    inventoryTransactionId:
      originalEvent.eventType === 'MARK_COOKED'
        ? null
        : mealPlan.inventoryTransactionId,
  };

  const reversalEvent: EventLog = {
    id: options.reversalEventId,
    entityType: 'meal_plan',
    entityId: mealPlan.id,
    eventType: 'MealStateReverted',
    previousState: mealPlan.status,
    nextState: previousState,
    occurredAt: options.occurredAt,
    actor: 'user',
    payload: { reversedEventId: originalEvent.id },
    idempotencyKey: options.idempotencyKey,
    reversed: false,
  };

  return { mealPlan: restored, reversalEvent, sideEffects };
}
