export type CookingSessionStatus =
  | 'active'
  | 'paused'
  | 'completed'
  | 'cancelled'
  | 'abandoned';

export interface StepProgress {
  stepOrder: number;
  enteredAt?: string | null;
  completedAt?: string | null;
  skipped: boolean;
  timerStarted: boolean;
  notes?: string | null;
}

export interface CookingSession {
  id: string;
  mealPlanId: string;
  recipeId: string;
  recipeVersion: string;
  currentStepIndex: number;
  status: CookingSessionStatus;
  stepProgress: StepProgress[];
  activeTimerIds: string[];
  keepAwakeRequested: boolean;
  startedAt: string;
  pausedAt?: string | null;
  resumedAt?: string | null;
  completedAt?: string | null;
  updatedAt: string;
  version: number;
}

export interface RecipeStep {
  order: number;
  title?: string;
  instruction: string;
  heat?: 'none' | 'low' | 'medium_low' | 'medium' | 'medium_high' | 'high';
  minutes?: number;
  timerRecommended?: boolean;
  completionCue?: string;
}

function assertActive(session: CookingSession): void {
  if (session.status !== 'active') {
    throw new Error(`Cooking session is not active: ${session.status}`);
  }
}

export function createCookingSession(options: {
  id: string;
  mealPlanId: string;
  recipeId: string;
  recipeVersion: string;
  stepCount: number;
  startedAt: string;
}): CookingSession {
  if (options.stepCount <= 0) {
    throw new Error('Recipe must contain at least one step.');
  }

  return {
    id: options.id,
    mealPlanId: options.mealPlanId,
    recipeId: options.recipeId,
    recipeVersion: options.recipeVersion,
    currentStepIndex: 0,
    status: 'active',
    stepProgress: Array.from({ length: options.stepCount }, (_, index) => ({
      stepOrder: index + 1,
      enteredAt: index === 0 ? options.startedAt : null,
      completedAt: null,
      skipped: false,
      timerStarted: false,
      notes: null,
    })),
    activeTimerIds: [],
    keepAwakeRequested: true,
    startedAt: options.startedAt,
    pausedAt: null,
    resumedAt: null,
    completedAt: null,
    updatedAt: options.startedAt,
    version: 1,
  };
}

export function moveNext(
  session: CookingSession,
  stepCount: number,
  occurredAt: string,
): CookingSession {
  assertActive(session);

  if (session.currentStepIndex >= stepCount - 1) {
    throw new Error('Last step requires explicit cooking completion.');
  }

  const progress = session.stepProgress.map((item) => ({ ...item }));
  const current = progress[session.currentStepIndex];
  const next = progress[session.currentStepIndex + 1];

  if (!current || !next) {
    throw new Error('Invalid cooking step state.');
  }

  current.completedAt = occurredAt;
  if (!next.enteredAt) next.enteredAt = occurredAt;

  return {
    ...session,
    currentStepIndex: session.currentStepIndex + 1,
    stepProgress: progress,
    updatedAt: occurredAt,
    version: session.version + 1,
  };
}

export function movePrevious(
  session: CookingSession,
  occurredAt: string,
): CookingSession {
  assertActive(session);

  if (session.currentStepIndex <= 0) return session;

  return {
    ...session,
    currentStepIndex: session.currentStepIndex - 1,
    updatedAt: occurredAt,
    version: session.version + 1,
  };
}

export function pauseCooking(
  session: CookingSession,
  occurredAt: string,
): CookingSession {
  assertActive(session);

  return {
    ...session,
    status: 'paused',
    keepAwakeRequested: false,
    pausedAt: occurredAt,
    updatedAt: occurredAt,
    version: session.version + 1,
  };
}

export function resumeCooking(
  session: CookingSession,
  occurredAt: string,
): CookingSession {
  if (session.status !== 'paused') {
    throw new Error('Only paused sessions can be resumed.');
  }

  return {
    ...session,
    status: 'active',
    keepAwakeRequested: true,
    resumedAt: occurredAt,
    updatedAt: occurredAt,
    version: session.version + 1,
  };
}

export function requestCompletion(
  session: CookingSession,
  stepCount: number,
): { allowed: boolean; reason?: string } {
  if (session.status !== 'active') {
    return { allowed: false, reason: 'Session is not active.' };
  }
  if (session.currentStepIndex !== stepCount - 1) {
    return { allowed: false, reason: 'Not on the final step.' };
  }
  return { allowed: true };
}

export function markSessionCompleted(
  session: CookingSession,
  occurredAt: string,
): CookingSession {
  assertActive(session);

  const progress = session.stepProgress.map((item) => ({ ...item }));
  const current = progress[session.currentStepIndex];
  if (current && !current.completedAt) current.completedAt = occurredAt;

  return {
    ...session,
    status: 'completed',
    stepProgress: progress,
    keepAwakeRequested: false,
    completedAt: occurredAt,
    updatedAt: occurredAt,
    version: session.version + 1,
  };
}
