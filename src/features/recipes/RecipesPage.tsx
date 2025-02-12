import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Box,
  Stack,
  Button,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface Recipe {
  id: number;
  name: string;
  image: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  time: string;
  ingredients: number;
  cuisine: string;
  category: string;
  isFavorite: boolean;
}

const SAMPLE_RECIPES: Recipe[] = [
  {
    id: 1,
    name: 'Mantarlı Risotto',
    image: 'https://source.unsplash.com/random/400x300?risotto',
    difficulty: 'Orta',
    time: '45 dk',
    ingredients: 8,
    cuisine: 'İtalyan',
    category: 'Ana Yemek',
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Mercimek Çorbası',
    image: 'https://source.unsplash.com/random/400x300?soup',
    difficulty: 'Kolay',
    time: '30 dk',
    ingredients: 6,
    cuisine: 'Türk',
    category: 'Çorba',
    isFavorite: true,
  },
  {
    id: 3,
    name: 'Karnıyarık',
    image: 'https://source.unsplash.com/random/400x300?eggplant',
    difficulty: 'Zor',
    time: '60 dk',
    ingredients: 10,
    cuisine: 'Türk',
    category: 'Ana Yemek',
    isFavorite: false,
  },
];

export const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(SAMPLE_RECIPES);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (recipeId: number) => {
    setRecipes(recipes.map(recipe =>
      recipe.id === recipeId
        ? { ...recipe, isFavorite: !recipe.isFavorite }
        : recipe
    ));
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Tarifler
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Tüm tarifleri keşfedin veya malzemelerinize göre filtreleme yapın
          </Typography>
        </Paper>

        {/* Search and Filter */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Tarif ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                >
                  Filtrele
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                >
                  Yapılabilir Tarifler
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Recipe Grid */}
        <Grid container spacing={3}>
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image}
                  alt={recipe.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {recipe.name}
                    </Typography>
                    <IconButton
                      onClick={() => toggleFavorite(recipe.id)}
                      color="primary"
                      size="small"
                    >
                      {recipe.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Box>
                  
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                      label={recipe.difficulty}
                      size="small"
                      color={
                        recipe.difficulty === 'Kolay'
                          ? 'success'
                          : recipe.difficulty === 'Orta'
                          ? 'primary'
                          : 'error'
                      }
                    />
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={recipe.time}
                      size="small"
                    />
                    <Chip
                      icon={<RestaurantIcon />}
                      label={`${recipe.ingredients} malzeme`}
                      size="small"
                    />
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Chip label={recipe.cuisine} size="small" variant="outlined" />
                    <Chip label={recipe.category} size="small" variant="outlined" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              Aradığınız kriterlere uygun tarif bulunamadı.
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}; 