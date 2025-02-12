import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IngredientInput } from './IngredientInput';
import { UserIngredient } from '../../types/ingredient';

const INGREDIENT_CATEGORIES = [
  { id: 'all', label: 'Tümü' },
  { id: 'vegetable', label: 'Sebzeler' },
  { id: 'meat', label: 'Et Ürünleri' },
  { id: 'dairy', label: 'Süt Ürünleri' },
  { id: 'grain', label: 'Tahıllar' },
  { id: 'spice', label: 'Baharatlar' },
];

export const IngredientManager: React.FC = () => {
  const [ingredients, setIngredients] = useState<UserIngredient[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddIngredient = (ingredient: Omit<UserIngredient, 'id' | 'inStock'>) => {
    const newIngredient: UserIngredient = {
      ...ingredient,
      id: Date.now().toString(),
      inStock: true,
    };
    setIngredients([...ingredients, newIngredient]);
    setShowAddForm(false);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const filteredIngredients = selectedCategory === 'all'
    ? ingredients
    : ingredients.filter((ingredient) => ingredient.type === selectedCategory);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(45deg, #4ECDC4 30%, #71D7D0 90%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Malzeme Yönetimi
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Mutfağınızdaki malzemeleri ekleyin ve yönetin
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => setShowAddForm(true)}
            sx={{ bgcolor: 'white', color: 'primary.main' }}
          >
            Yeni Malzeme Ekle
          </Button>
        </Paper>

        {/* Category Filters */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ overflowX: 'auto', pb: 1 }}
          >
            {INGREDIENT_CATEGORIES.map((category) => (
              <Chip
                key={category.id}
                label={category.label}
                onClick={() => setSelectedCategory(category.id)}
                color={selectedCategory === category.id ? 'primary' : 'default'}
                variant={selectedCategory === category.id ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </Paper>

        {/* Add Ingredient Form */}
        {showAddForm && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Yeni Malzeme Ekle
            </Typography>
            <IngredientInput
              onIngredientAdd={handleAddIngredient}
              suggestions={[
                { id: '1', name: 'Domates', type: 'vegetable' },
                { id: '2', name: 'Soğan', type: 'vegetable' },
                { id: '3', name: 'Pirinç', type: 'grain' },
              ]}
            />
          </Paper>
        )}

        {/* Ingredients Grid */}
        <Grid container spacing={3}>
          {filteredIngredients.map((ingredient) => (
            <Grid item xs={12} sm={6} md={4} key={ingredient.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {ingredient.name}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {ingredient.type && (
                          <Chip
                            label={INGREDIENT_CATEGORIES.find(cat => cat.id === ingredient.type)?.label}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                        {ingredient.quantity && ingredient.unit && (
                          <Chip
                            label={`${ingredient.quantity} ${ingredient.unit}`}
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Box>
                    <IconButton
                      onClick={() => handleRemoveIngredient(ingredient.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredIngredients.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {selectedCategory === 'all'
                ? 'Henüz hiç malzeme eklenmemiş.'
                : 'Bu kategoride malzeme bulunamadı.'}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setShowAddForm(true)}
            >
              Malzeme Ekle
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
}; 