import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Divider,
  IconButton,
  Alert,
  Snackbar,
  Stack
} from '@mui/material';
import {
  AccessTime,
  Restaurant,
  Favorite,
  FavoriteBorder,
  Share,
  ArrowBack,
  Check
} from '@mui/icons-material';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  category: string;
  image: string;
  rating: number;
  isFavorite?: boolean;
}

export default function RecipeDetailPage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [userRating, setUserRating] = useState<number | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadRecipe();
  }, [id, currentUser]);

  const loadRecipe = async () => {
    if (!id || !currentUser) return;

    try {
      const recipeDoc = await getDoc(doc(db, 'recipes', id));
      if (!recipeDoc.exists()) {
        setError('Tarif bulunamadı');
        return;
      }

      // Kullanıcının bu tarife verdiği puanı kontrol et
      const userRatingDoc = await getDoc(doc(db, `users/${currentUser.uid}/ratings/${id}`));
      if (userRatingDoc.exists()) {
        setUserRating(userRatingDoc.data().rating);
      }

      // Kullanıcının favori durumunu kontrol et
      const favoriteDoc = await getDoc(doc(db, `users/${currentUser.uid}/favorites/${id}`));

      setRecipe({
        id: recipeDoc.id,
        ...recipeDoc.data(),
        isFavorite: favoriteDoc.exists() && favoriteDoc.data()?.active
      } as Recipe);
    } catch (error) {
      console.error('Tarif yüklenirken hata:', error);
      setError('Tarif yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!recipe || !currentUser) return;

    try {
      const favoriteRef = doc(db, `users/${currentUser.uid}/favorites/${recipe.id}`);
      if (recipe.isFavorite) {
        await updateDoc(favoriteRef, { active: false });
      } else {
        await addDoc(collection(db, `users/${currentUser.uid}/favorites`), {
          recipeId: recipe.id,
          addedAt: new Date().toISOString(),
          active: true
        });
      }

      setRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
      showSnackbar(
        recipe.isFavorite
          ? 'Tarif favorilerden kaldırıldı'
          : 'Tarif favorilere eklendi',
        'success'
      );
    } catch (error) {
      console.error('Favori işlemi sırasında hata:', error);
      showSnackbar('İşlem sırasında bir hata oluştu', 'error');
    }
  };

  const handleRating = async (newValue: number | null) => {
    if (!recipe || !currentUser || !newValue) return;

    try {
      const ratingRef = doc(db, `users/${currentUser.uid}/ratings/${recipe.id}`);
      await updateDoc(ratingRef, {
        rating: newValue,
        updatedAt: new Date().toISOString()
      });

      setUserRating(newValue);
      showSnackbar('Puanınız kaydedildi', 'success');
    } catch (error) {
      console.error('Puan verirken hata:', error);
      showSnackbar('Puan verilirken bir hata oluştu', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  if (loading) {
    return (
      <Container>
        <Typography>Yükleniyor...</Typography>
      </Container>
    );
  }

  if (error || !recipe) {
    return (
      <Container>
        <Alert severity="error">{error || 'Tarif bulunamadı'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        {/* Üst Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            {recipe.title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={handleFavoriteToggle} color={recipe.isFavorite ? 'primary' : 'default'}>
              {recipe.isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton>
              <Share />
            </IconButton>
          </Stack>
        </Box>

        <Grid container spacing={4}>
          {/* Sol Kolon - Resim ve Detaylar */}
          <Grid item xs={12} md={8}>
            <Box
              component="img"
              src={recipe.image || 'https://source.unsplash.com/random/800x400?food'}
              alt={recipe.title}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 2,
                mb: 3
              }}
            />
            
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Chip label={recipe.cuisine} color="primary" />
              <Chip label={recipe.category} color="secondary" />
              <Chip label={recipe.difficulty} variant="outlined" />
            </Stack>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTime sx={{ mr: 1 }} />
                <Typography>{recipe.cookingTime} dakika</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Restaurant sx={{ mr: 1 }} />
                <Typography>{recipe.servings} kişilik</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                <Rating
                  value={userRating}
                  onChange={(_, newValue) => handleRating(newValue)}
                />
              </Box>
            </Box>

            <Typography variant="body1" paragraph>
              {recipe.description}
            </Typography>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Hazırlanışı
            </Typography>
            <List>
              {recipe.instructions.map((instruction, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                  <ListItemText primary={instruction} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Sağ Kolon - Malzemeler */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Malzemeler
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={ingredient.name}
                      secondary={`${ingredient.amount} ${ingredient.unit}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
} 