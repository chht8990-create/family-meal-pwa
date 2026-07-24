export interface InventoryLot {
  id: string;
  ingredientId: string;
  quantity: number;
  unit: string;
  expiryDate?: string | null;
  status: 'normal' | 'low' | 'out' | 'expired' | 'discarded';
  sourceTransactionId?: string | null;
}

export interface InventoryTransaction {
  id: string;
  ingredientId: string;
  type:
    | 'purchase'
    | 'consume'
    | 'manual_add'
    | 'manual_remove'
    | 'discard'
    | 'reversal'
    | 'adjustment';
  quantity: number;
  unit: string;
  occurredAt: string;
  source: 'shopping' | 'meal' | 'manual' | 'migration' | 'system';
  sourceEntityId?: string | null;
  correlationId?: string | null;
  idempotencyKey: string;
  reversed: boolean;
  reversedByTransactionId?: string | null;
}

function expirySortValue(value?: string | null): number {
  if (!value) return Number.MAX_SAFE_INTEGER;
  return new Date(value).getTime();
}

export function consumeInventory(
  lots: InventoryLot[],
  options: {
    ingredientId: string;
    quantity: number;
    unit: string;
  },
): {
  lots: InventoryLot[];
  consumedQuantity: number;
  shortageQuantity: number;
  lotConsumptions: Array<{ lotId: string; quantity: number }>;
} {
  const next = lots.map((lot) => ({ ...lot }));
  let remaining = options.quantity;
  const lotConsumptions: Array<{ lotId: string; quantity: number }> = [];

  const candidates = next
    .filter(
      (lot) =>
        lot.ingredientId === options.ingredientId &&
        lot.unit === options.unit &&
        lot.quantity > 0 &&
        !['expired', 'discarded', 'out'].includes(lot.status),
    )
    .sort(
      (a, b) =>
        expirySortValue(a.expiryDate) - expirySortValue(b.expiryDate),
    );

  for (const lot of candidates) {
    if (remaining <= 0) break;

    const consumed = Math.min(lot.quantity, remaining);
    lot.quantity -= consumed;
    remaining -= consumed;
    lotConsumptions.push({ lotId: lot.id, quantity: consumed });

    if (lot.quantity <= 0) {
      lot.status = 'out';
    }
  }

  return {
    lots: next,
    consumedQuantity: options.quantity - remaining,
    shortageQuantity: remaining,
    lotConsumptions,
  };
}

export function addPurchasedInventory(
  lots: InventoryLot[],
  options: {
    lotId: string;
    ingredientId: string;
    quantity: number;
    unit: string;
    expiryDate?: string | null;
    sourceTransactionId: string;
  },
): InventoryLot[] {
  return [
    ...lots,
    {
      id: options.lotId,
      ingredientId: options.ingredientId,
      quantity: options.quantity,
      unit: options.unit,
      expiryDate: options.expiryDate ?? null,
      status: options.quantity > 0 ? 'normal' : 'out',
      sourceTransactionId: options.sourceTransactionId,
    },
  ];
}

export function assertUniqueIdempotencyKey(
  transactions: InventoryTransaction[],
  key: string,
): void {
  if (transactions.some((tx) => tx.idempotencyKey === key)) {
    throw new Error('Duplicate inventory transaction.');
  }
}
