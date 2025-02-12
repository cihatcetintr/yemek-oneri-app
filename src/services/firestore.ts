import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  CollectionReference,
  Query,
} from 'firebase/firestore';
import { db } from './firebase';
import { UserIngredient } from '../types/ingredient';
import { Recipe } from '../types/recipe';

// Ingredients
export const addIngredient = async (userId: string, ingredient: Omit<UserIngredient, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/ingredients`), ingredient);
    return { id: docRef.id, ...ingredient };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateIngredient = async (userId: string, ingredientId: string, updates: Partial<UserIngredient>) => {
  try {
    const docRef = doc(db, `users/${userId}/ingredients`, ingredientId);
    await updateDoc(docRef, updates);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteIngredient = async (userId: string, ingredientId: string) => {
  try {
    const docRef = doc(db, `users/${userId}/ingredients`, ingredientId);
    await deleteDoc(docRef);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserIngredients = async (userId: string): Promise<UserIngredient[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, `users/${userId}/ingredients`));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as UserIngredient));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Recipes
export const addRecipe = async (recipe: Omit<Recipe, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'recipes'), recipe);
    return { id: docRef.id, ...recipe };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateRecipe = async (recipeId: string, updates: Partial<Recipe>) => {
  try {
    const docRef = doc(db, 'recipes', recipeId);
    await updateDoc(docRef, updates);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteRecipe = async (recipeId: string) => {
  try {
    const docRef = doc(db, 'recipes', recipeId);
    await deleteDoc(docRef);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getRecipe = async (recipeId: string): Promise<Recipe> => {
  try {
    const docRef = doc(db, 'recipes', recipeId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Recipe not found');
    }
    return { id: docSnap.id, ...docSnap.data() } as Recipe;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getRecipes = async (filters?: {
  cuisine?: string;
  category?: string;
  difficulty?: string;
  maxIngredients?: number;
}): Promise<Recipe[]> => {
  try {
    const recipesRef = collection(db, 'recipes');
    let queryRef: Query = recipesRef;
    
    if (filters) {
      const conditions = [];
      if (filters.cuisine) conditions.push(where('cuisine', '==', filters.cuisine));
      if (filters.category) conditions.push(where('category', '==', filters.category));
      if (filters.difficulty) conditions.push(where('difficulty', '==', filters.difficulty));
      if (filters.maxIngredients) conditions.push(where('ingredientsCount', '<=', filters.maxIngredients));
      
      queryRef = query(recipesRef, ...conditions, orderBy('name'), limit(20));
    }

    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Recipe));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// User Favorites
export const toggleFavoriteRecipe = async (userId: string, recipeId: string, isFavorite: boolean) => {
  try {
    const docRef = doc(db, `users/${userId}/favorites`, recipeId);
    if (isFavorite) {
      await deleteDoc(docRef);
    } else {
      await addDoc(collection(db, `users/${userId}/favorites`), {
        recipeId,
        addedAt: new Date(),
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserFavorites = async (userId: string): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, `users/${userId}/favorites`));
    return querySnapshot.docs.map(doc => doc.data().recipeId);
  } catch (error: any) {
    throw new Error(error.message);
  }
}; 