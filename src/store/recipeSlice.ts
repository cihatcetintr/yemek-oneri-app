import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../types';

interface RecipeState {
  recipes: Recipe[];
  userIngredients: string[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  userIngredients: [],
  loading: false,
  error: null
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<string>) {
      state.userIngredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.userIngredients = state.userIngredients.filter(
        ingredient => ingredient !== action.payload
      );
    },
    setRecipes(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
    }
  }
});

export const { addIngredient, removeIngredient, setRecipes } = recipeSlice.actions;
export default recipeSlice.reducer; 