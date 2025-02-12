import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Chip,
  Stack,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface RecipeFilters {
  cuisine: string[];
  category: string[];
  difficulty: string[];
  maxTime: number;
  maxIngredients: number;
  dietary: string[];
}

interface RecipeFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: RecipeFilters;
  onApplyFilters: (filters: RecipeFilters) => void;
}

const CUISINES = ['Türk', 'İtalyan', 'Çin', 'Hint', 'Meksika', 'Japon'];
const CATEGORIES = ['Ana Yemek', 'Çorba', 'Salata', 'Tatlı', 'Atıştırmalık'];
const DIFFICULTIES = ['Kolay', 'Orta', 'Zor'];
const DIETARY = ['Vejetaryen', 'Vegan', 'Glutensiz', 'Düşük Kalorili'];

export const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  open,
  onClose,
  filters,
  onApplyFilters,
}) => {
  const [localFilters, setLocalFilters] = React.useState<RecipeFilters>(filters);

  const handleReset = () => {
    setLocalFilters({
      cuisine: [],
      category: [],
      difficulty: [],
      maxTime: 120,
      maxIngredients: 20,
      dietary: [],
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Tarifleri Filtrele</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Cuisine */}
          <Box>
            <Typography gutterBottom>Mutfak</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {CUISINES.map((cuisine) => (
                <Chip
                  key={cuisine}
                  label={cuisine}
                  onClick={() => {
                    const newCuisines = localFilters.cuisine.includes(cuisine)
                      ? localFilters.cuisine.filter((c) => c !== cuisine)
                      : [...localFilters.cuisine, cuisine];
                    setLocalFilters({ ...localFilters, cuisine: newCuisines });
                  }}
                  color={localFilters.cuisine.includes(cuisine) ? 'primary' : 'default'}
                  variant={localFilters.cuisine.includes(cuisine) ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>
          </Box>

          {/* Category */}
          <Box>
            <Typography gutterBottom>Kategori</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {CATEGORIES.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => {
                    const newCategories = localFilters.category.includes(category)
                      ? localFilters.category.filter((c) => c !== category)
                      : [...localFilters.category, category];
                    setLocalFilters({ ...localFilters, category: newCategories });
                  }}
                  color={localFilters.category.includes(category) ? 'primary' : 'default'}
                  variant={localFilters.category.includes(category) ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>
          </Box>

          {/* Difficulty */}
          <Box>
            <Typography gutterBottom>Zorluk Seviyesi</Typography>
            <Stack direction="row" spacing={1}>
              {DIFFICULTIES.map((difficulty) => (
                <Chip
                  key={difficulty}
                  label={difficulty}
                  onClick={() => {
                    const newDifficulties = localFilters.difficulty.includes(difficulty)
                      ? localFilters.difficulty.filter((d) => d !== difficulty)
                      : [...localFilters.difficulty, difficulty];
                    setLocalFilters({ ...localFilters, difficulty: newDifficulties });
                  }}
                  color={localFilters.difficulty.includes(difficulty) ? 'primary' : 'default'}
                  variant={localFilters.difficulty.includes(difficulty) ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>
          </Box>

          {/* Time */}
          <Box>
            <Typography gutterBottom>Maksimum Hazırlama Süresi</Typography>
            <Slider
              value={localFilters.maxTime}
              onChange={(_, value) =>
                setLocalFilters({ ...localFilters, maxTime: value as number })
              }
              valueLabelDisplay="auto"
              min={15}
              max={180}
              step={15}
              marks={[
                { value: 30, label: '30dk' },
                { value: 60, label: '1s' },
                { value: 120, label: '2s' },
                { value: 180, label: '3s' },
              ]}
            />
          </Box>

          {/* Ingredients Count */}
          <Box>
            <Typography gutterBottom>Maksimum Malzeme Sayısı</Typography>
            <Slider
              value={localFilters.maxIngredients}
              onChange={(_, value) =>
                setLocalFilters({ ...localFilters, maxIngredients: value as number })
              }
              valueLabelDisplay="auto"
              min={5}
              max={30}
              step={1}
              marks={[
                { value: 5, label: '5' },
                { value: 15, label: '15' },
                { value: 30, label: '30' },
              ]}
            />
          </Box>

          {/* Dietary Preferences */}
          <Box>
            <Typography gutterBottom>Diyet Tercihleri</Typography>
            <FormGroup>
              {DIETARY.map((diet) => (
                <FormControlLabel
                  key={diet}
                  control={
                    <Checkbox
                      checked={localFilters.dietary.includes(diet)}
                      onChange={(e) => {
                        const newDietary = e.target.checked
                          ? [...localFilters.dietary, diet]
                          : localFilters.dietary.filter((d) => d !== diet);
                        setLocalFilters({ ...localFilters, dietary: newDietary });
                      }}
                    />
                  }
                  label={diet}
                />
              ))}
            </FormGroup>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset}>Sıfırla</Button>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleApply} variant="contained">
          Uygula
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 