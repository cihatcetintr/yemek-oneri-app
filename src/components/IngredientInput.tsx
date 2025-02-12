import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addIngredient } from '../store/recipeSlice';

export const IngredientInput: React.FC = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addIngredient(input.trim()));
      setInput('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ m: 2 }}>
      <TextField
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Malzeme ekleyin..."
        variant="outlined"
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        Ekle
      </Button>
    </Box>
  );
}; 