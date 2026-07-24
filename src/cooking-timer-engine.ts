export type CookingTimerStatus =
  | 'idle'
  | 'running'
  | 'paused'
  | 'completed'
  | 'cancelled';

export interface CookingTimer {
  id: string;
  sessionId: string;
  stepOrder: number;
  label: string;
  durationSeconds: number;
  remainingSeconds: number;
  status: CookingTimerStatus;
  startedAt?: string | null;
  endsAt?: string | null;
  pausedAt?: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export function createTimer(options: {
  id: string;
  sessionId: string;
  stepOrder: number;
  label: string;
  durationSeconds: number;
  createdAt: string;
}): CookingTimer {
  if (options.durationSeconds <= 0) {
    throw new Error('Timer duration must be positive.');
  }

  return {
    id: options.id,
    sessionId: options.sessionId,
    stepOrder: options.stepOrder,
    label: options.label,
    durationSeconds: options.durationSeconds,
    remainingSeconds: options.durationSeconds,
    status: 'idle',
    startedAt: null,
    endsAt: null,
    pausedAt: null,
    version: 1,
    createdAt: options.createdAt,
    updatedAt: options.createdAt,
  };
}

export function startTimer(
  timer: CookingTimer,
  now: Date,
): CookingTimer {
  if (!['idle', 'paused'].includes(timer.status)) {
    throw new Error(`Cannot start timer from ${timer.status}.`);
  }

  const endsAt = new Date(now.getTime() + timer.remainingSeconds * 1000);

  return {
    ...timer,
    status: 'running',
    startedAt: timer.startedAt ?? now.toISOString(),
    endsAt: endsAt.toISOString(),
    pausedAt: null,
    updatedAt: now.toISOString(),
    version: timer.version + 1,
  };
}

export function remainingSeconds(
  timer: CookingTimer,
  now: Date,
): number {
  if (timer.status !== 'running' || !timer.endsAt) {
    return timer.remainingSeconds;
  }
  return Math.max(
    0,
    Math.ceil((new Date(timer.endsAt).getTime() - now.getTime()) / 1000),
  );
}

export function pauseTimer(
  timer: CookingTimer,
  now: Date,
): CookingTimer {
  if (timer.status !== 'running') {
    throw new Error('Only running timers can be paused.');
  }

  return {
    ...timer,
    status: 'paused',
    remainingSeconds: remainingSeconds(timer, now),
    endsAt: null,
    pausedAt: now.toISOString(),
    updatedAt: now.toISOString(),
    version: timer.version + 1,
  };
}

export function addTime(
  timer: CookingTimer,
  seconds: number,
  now: Date,
): CookingTimer {
  if (seconds <= 0) {
    throw new Error('Added time must be positive.');
  }

  const remaining = remainingSeconds(timer, now) + seconds;
  const endsAt =
    timer.status === 'running'
      ? new Date(now.getTime() + remaining * 1000).toISOString()
      : timer.endsAt;

  return {
    ...timer,
    remainingSeconds: remaining,
    endsAt,
    updatedAt: now.toISOString(),
    version: timer.version + 1,
  };
}
