export interface Ingredient {
  name: string;
  substitutes?: string[];
  type?: string;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  categories: string[];
  difficulty: number;
  cookingTime: number;
} 