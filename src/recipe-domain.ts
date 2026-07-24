export type Unit =
  | 'g' | 'kg' | 'ml' | 'l'
  | 'tsp' | 'tbsp' | 'cup'
  | 'piece' | 'clove' | 'stalk' | 'slice'
  | 'pack' | 'bowl' | 'pinch' | 'dash';

export type ScalingMode =
  | 'linear'
  | 'gentle'
  | 'minimal'
  | 'fixed'
  | 'capped'
  | 'discrete';

export interface ScalingRule {
  mode: ScalingMode;
  minQuantity?: number;
  maxQuantity?: number;
  step?: number;
  rounding?: 'nearest' | 'up' | 'down';
}

export interface IngredientLine {
  ingredientId: string;
  name: string;
  group: 'main' | 'seasoning' | 'garnish' | 'optional';
  quantity: number;
  unit: Unit;
  quantityText?: string;
  scaling: ScalingRule;
  inventoryTracked: boolean;
  shoppingEligible: boolean;
  optional?: boolean;
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

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  version: string;
  status: 'draft' | 'active' | 'archived';
  baseServings: number;
  difficulty: 'easy' | 'normal' | 'hard';
  time: {
    prepMinutes: number;
    cookMinutes: number;
    restMinutes?: number;
    totalMinutes: number;
  };
  ingredients: IngredientLine[];
  preparation: Array<{
    order: number;
    instruction: string;
    minutes?: number;
  }>;
  steps: RecipeStep[];
  tips?: string[];
  sideDishes?: string[];
  storage: {
    refrigeratedDays: number | null;
    frozenDays: number | null;
    reheat?: string;
  };
  verification: {
    level:
      | 'draft'
      | 'tested_once'
      | 'tested_multiple'
      | 'household_verified'
      | 'official_reviewed';
    testedCount: number;
    notes?: string;
    verifiedAt?: string | null;
  };
}

function roundToStep(
  value: number,
  step: number,
  mode: 'nearest' | 'up' | 'down',
): number {
  const ratio = value / step;
  if (mode === 'up') return Math.ceil(ratio) * step;
  if (mode === 'down') return Math.floor(ratio) * step;
  return Math.round(ratio) * step;
}

export function scaleQuantity(
  baseQuantity: number,
  baseServings: number,
  targetServings: number,
  rule: ScalingRule,
): number {
  if (baseServings <= 0 || targetServings <= 0) {
    throw new Error('Servings must be greater than zero.');
  }

  const ratio = targetServings / baseServings;
  let value: number;

  switch (rule.mode) {
    case 'linear':
      value = baseQuantity * ratio;
      break;
    case 'gentle':
      value = baseQuantity * Math.pow(ratio, 0.75);
      break;
    case 'minimal':
      value = baseQuantity * Math.pow(ratio, 0.4);
      break;
    case 'fixed':
      value = baseQuantity;
      break;
    case 'capped':
      value = baseQuantity * ratio;
      if (rule.maxQuantity !== undefined) {
        value = Math.min(value, rule.maxQuantity);
      }
      break;
    case 'discrete':
      value = baseQuantity * ratio;
      break;
    default:
      throw new Error(`Unsupported scaling mode: ${String(rule.mode)}`);
  }

  if (rule.minQuantity !== undefined) {
    value = Math.max(value, rule.minQuantity);
  }
  if (rule.maxQuantity !== undefined && rule.mode !== 'capped') {
    value = Math.min(value, rule.maxQuantity);
  }

  const step = rule.step ?? 0.01;
  const rounding = rule.rounding ?? 'nearest';
  return Number(roundToStep(value, step, rounding).toFixed(4));
}

export function scaleRecipe(
  recipe: Recipe,
  targetServings: number,
): IngredientLine[] {
  if (targetServings < 2 || targetServings > 10) {
    throw new Error('WS-02 supports serving sizes from 2 to 10.');
  }

  return recipe.ingredients.map((line) => ({
    ...line,
    quantity: scaleQuantity(
      line.quantity,
      recipe.baseServings,
      targetServings,
      line.scaling,
    ),
  }));
}
