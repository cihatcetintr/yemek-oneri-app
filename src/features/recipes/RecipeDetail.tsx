import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  Stack,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getRecipe } from '../../services/firestore';
import { Recipe } from '../../types/recipe';

export const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        if (id) {
          const recipeData = await getRecipe(id);
          setRecipe(recipeData);
        }
      } catch (error) {
        console.error('Error loading recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography>Yükleniyor...</Typography>
        </Box>
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography>Tarif bulunamadı.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${recipe.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {recipe.name}
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              {recipe.description}
            </Typography>
            
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Chip
                icon={<AccessTimeIcon />}
                label={recipe.time}
                sx={{ color: 'white', borderColor: 'white' }}
                variant="outlined"
              />
              <Chip
                icon={<RestaurantIcon />}
                label={`${recipe.ingredientsCount} malzeme`}
                sx={{ color: 'white', borderColor: 'white' }}
                variant="outlined"
              />
              <Chip
                icon={<PersonIcon />}
                label={`${recipe.servings} kişilik`}
                sx={{ color: 'white', borderColor: 'white' }}
                variant="outlined"
              />
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
            >
              <Chip
                label={recipe.difficulty}
                color={
                  recipe.difficulty === 'Kolay'
                    ? 'success'
                    : recipe.difficulty === 'Orta'
                    ? 'primary'
                    : 'error'
                }
              />
              <Chip label={recipe.cuisine} />
              <Chip label={recipe.category} />
            </Stack>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Ingredients */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Malzemeler
              </Typography>
              <List>
                {recipe.ingredients.map((ingredient, index) => (
                  <React.Fragment key={ingredient.id}>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={ingredient.name}
                        secondary={`${ingredient.amount} ${ingredient.unit}`}
                      />
                    </ListItem>
                    {index < recipe.ingredients.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Instructions */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Hazırlanışı
              </Typography>
              <List>
                {recipe.instructions.map((instruction, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="h6" color="primary">
                          {index + 1}.
                        </Typography>
                      </ListItemIcon>
                      <ListItemText primary={instruction} />
                    </ListItem>
                    {index < recipe.instructions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={recipe.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          >
            {recipe.isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<RestaurantIcon />}
          >
            Yapıldı Olarak İşaretle
          </Button>
        </Box>
      </Box>
    </Container>
  );
}; 