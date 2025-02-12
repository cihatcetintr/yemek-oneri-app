import React, { useState } from 'react';
import {
  TextField,
  Autocomplete,
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Ingredient } from '../../types/ingredient';

interface IngredientInputProps {
  onIngredientAdd: (ingredient: Ingredient) => void;
  suggestions?: Ingredient[];
}

const UNITS = ['gram', 'kg', 'adet', 'litre', 'ml', 'yemek kaşığı', 'çay kaşığı'];

export const IngredientInput: React.FC<IngredientInputProps> = ({
  onIngredientAdd,
  suggestions = [],
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [unit, setUnit] = useState<string>('');

  const handleSubmit = () => {
    if (selectedIngredient) {
      onIngredientAdd({
        ...selectedIngredient,
        quantity: quantity ? Number(quantity) : undefined,
        unit: unit || undefined,
      });
      setSelectedIngredient(null);
      setInputValue('');
      setQuantity('');
      setUnit('');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            value={selectedIngredient}
            onChange={(_, newValue) => setSelectedIngredient(newValue)}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            options={suggestions}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Malzeme Adı"
                variant="outlined"
                fullWidth
                required
              />
            )}
            sx={{ mb: { xs: 2, md: 0 } }}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField
            label="Miktar"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            inputProps={{ min: 0 }}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Birim</InputLabel>
            <Select
              value={unit}
              label="Birim"
              onChange={(e) => setUnit(e.target.value)}
            >
              {UNITS.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!selectedIngredient}
              fullWidth
              sx={{ height: '100%' }}
            >
              Ekle
            </Button>
            <IconButton
              size="small"
              onClick={() => {
                setSelectedIngredient(null);
                setInputValue('');
                setQuantity('');
                setUnit('');
              }}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}; 