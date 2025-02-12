export interface Ingredient {
  id: string;
  name: string;
  type?: 'vegetable' | 'meat' | 'dairy' | 'grain' | 'spice' | 'other';
  substitutes?: string[];
  quantity?: number;
  unit?: string;
}

export interface UserIngredient extends Ingredient {
  inStock: boolean;
  expiryDate?: Date;
}

export interface IngredientCategory {
  id: string;
  name: string;
  description?: string;
  ingredients: Ingredient[];
} 