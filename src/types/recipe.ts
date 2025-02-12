export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  time: string;
  servings: number;
  ingredients: {
    id: string;
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: string[];
  cuisine: string;
  category: string;
  ingredientsCount: number;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean;
} 