export interface RequiredIngredient {
  ingredientId: string;
  quantity: number;
  unit: string;
  mealPlanId: string;
  recipeId: string;
}

export interface InventoryLot {
  id: string;
  ingredientId: string;
  quantity: number;
  unit: string;
  expiryDate?: string | null;
  status: 'normal' | 'low' | 'out' | 'expired' | 'discarded';
}

export interface ShoppingItem {
  id: string;
  ingredientId: string;
  requiredQuantity: number;
  plannedPurchaseQuantity: number;
  purchasedQuantity?: number | null;
  unit: string;
  purchaseUnit?: string | null;
  purchaseSize?: number | null;
  status:
    | 'generated'
    | 'manual'
    | 'ready'
    | 'checked'
    | 'purchased'
    | 'stored'
    | 'cancelled';
  checked: boolean;
  sourceMealPlanIds: string[];
  sourceRecipeIds: string[];
  manualSourceNotes?: string[];
  priceKrw?: number | null;
  userAdjustedPurchaseQuantity: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseRule {
  purchaseUnit: string;
  purchaseSize: number;
  minimumPurchaseQuantity?: number;
}

export function availableInventory(
  lots: InventoryLot[],
  ingredientId: string,
  unit: string,
): number {
  return lots
    .filter(
      (lot) =>
        lot.ingredientId === ingredientId &&
        lot.unit === unit &&
        !['expired', 'discarded', 'out'].includes(lot.status) &&
        lot.quantity > 0,
    )
    .reduce((sum, lot) => sum + lot.quantity, 0);
}

export function calculateShortages(
  requirements: RequiredIngredient[],
  lots: InventoryLot[],
): Map<string, {
  ingredientId: string;
  unit: string;
  requiredQuantity: number;
  availableQuantity: number;
  shortageQuantity: number;
  sourceMealPlanIds: string[];
  sourceRecipeIds: string[];
}> {
  const grouped = new Map<string, RequiredIngredient[]>();

  for (const req of requirements) {
    const key = `${req.ingredientId}::${req.unit}`;
    const group = grouped.get(key) ?? [];
    group.push(req);
    grouped.set(key, group);
  }

  const result = new Map();

  for (const [key, group] of grouped.entries()) {
    const first = group[0];
    if (!first) continue;

    const requiredQuantity = group.reduce((sum, item) => sum + item.quantity, 0);
    const availableQuantity = availableInventory(
      lots,
      first.ingredientId,
      first.unit,
    );
    const shortageQuantity = Math.max(0, requiredQuantity - availableQuantity);

    if (shortageQuantity > 0) {
      result.set(key, {
        ingredientId: first.ingredientId,
        unit: first.unit,
        requiredQuantity,
        availableQuantity,
        shortageQuantity,
        sourceMealPlanIds: [...new Set(group.map((x) => x.mealPlanId))],
        sourceRecipeIds: [...new Set(group.map((x) => x.recipeId))],
      });
    }
  }

  return result;
}

export function calculatePurchaseQuantity(
  shortageQuantity: number,
  rule?: PurchaseRule,
): number {
  if (!rule) return shortageQuantity;

  const packs = Math.ceil(shortageQuantity / rule.purchaseSize);
  const minimum = rule.minimumPurchaseQuantity ?? 1;
  return Math.max(packs, minimum) * rule.purchaseSize;
}

export function mergeShoppingItems(
  current: ShoppingItem[],
  generated: ShoppingItem[],
  now: string,
): ShoppingItem[] {
  const output = [...current];

  for (const item of generated) {
    const existing = output.find(
      (candidate) =>
        candidate.ingredientId === item.ingredientId &&
        candidate.unit === item.unit &&
        !['purchased', 'stored', 'cancelled'].includes(candidate.status),
    );

    if (!existing) {
      output.push(item);
      continue;
    }

    existing.requiredQuantity = item.requiredQuantity;
    existing.sourceMealPlanIds = [
      ...new Set([...existing.sourceMealPlanIds, ...item.sourceMealPlanIds]),
    ];
    existing.sourceRecipeIds = [
      ...new Set([...existing.sourceRecipeIds, ...item.sourceRecipeIds]),
    ];

    if (!existing.userAdjustedPurchaseQuantity) {
      existing.plannedPurchaseQuantity = item.plannedPurchaseQuantity;
    }

    existing.version += 1;
    existing.updatedAt = now;
  }

  return output;
}
