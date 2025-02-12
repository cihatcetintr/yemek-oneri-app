import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Rating,
  Stack,
  Autocomplete
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Share,
  AccessTime,
  Restaurant,
  Add as AddIcon
} from '@mui/icons-material';
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from 'firebase/firestore';
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
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  cuisine: string;
  category: string;
  image: string;
  rating: number;
  isFavorite?: boolean;
}

const difficulties = ['Kolay', 'Orta', 'Zor'];
const cuisines = ['Türk', 'İtalyan', 'Çin', 'Hint', 'Meksika', 'Diğer'];
const categories = ['Ana Yemek', 'Çorba', 'Salata', 'Tatlı', 'Atıştırmalık'];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const { currentUser } = useAuth();

  useEffect(() => {
    loadRecipes();
  }, [currentUser]);

  const loadRecipes = async () => {
    if (!currentUser) return;

    try {
      const recipesRef = collection(db, 'recipes');
      const q = query(recipesRef, where('isPublic', '==', true));
      const querySnapshot = await getDocs(q);
      
      // Kullanıcının favori tariflerini al
      const favoritesRef = collection(db, `users/${currentUser.uid}/favorites`);
      const favoritesSnapshot = await getDocs(favoritesRef);
      const favoriteIds = new Set(favoritesSnapshot.docs.map(doc => doc.id));

      const loadedRecipes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isFavorite: favoriteIds.has(doc.id)
      })) as Recipe[];

      setRecipes(loadedRecipes);
    } catch (error) {
      console.error('Tarifler yüklenirken hata:', error);
      showSnackbar('Tarifler yüklenirken bir hata oluştu', 'error');
    }
  };

  const handleFavoriteToggle = async (recipe: Recipe) => {
    if (!currentUser) return;

    try {
      const favoriteRef = doc(db, `users/${currentUser.uid}/favorites/${recipe.id}`);
      if (recipe.isFavorite) {
        // Favorilerden kaldır
        await updateDoc(favoriteRef, { active: false });
      } else {
        // Favorilere ekle
        await addDoc(collection(db, `users/${currentUser.uid}/favorites`), {
          recipeId: recipe.id,
          addedAt: new Date().toISOString(),
          active: true
        });
      }

      // Yerel state'i güncelle
      setRecipes(recipes.map(r =>
        r.id === recipe.id ? { ...r, isFavorite: !r.isFavorite } : r
      ));

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

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = !selectedCuisine || recipe.cuisine === selectedCuisine;
    const matchesCategory = !selectedCategory || recipe.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;

    return matchesSearch && matchesCuisine && matchesCategory && matchesDifficulty;
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tarifler
        </Typography>
        
        {/* Arama ve Filtreleme */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Tarif Ara"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Mutfak</InputLabel>
                <Select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  label="Mutfak"
                >
                  <MenuItem value="">Tümü</MenuItem>
                  {cuisines.map((cuisine) => (
                    <MenuItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Kategori</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Kategori"
                >
                  <MenuItem value="">Tümü</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Zorluk</InputLabel>
                <Select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  label="Zorluk"
                >
                  <MenuItem value="">Tümü</MenuItem>
                  {difficulties.map((difficulty) => (
                    <MenuItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>

        {/* Tarif Listesi */}
        <Grid container spacing={3}>
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image || 'https://source.unsplash.com/random/400x300?food'}
                  alt={recipe.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {recipe.description}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip
                      size="small"
                      label={recipe.cuisine}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      size="small"
                      label={recipe.category}
                      color="secondary"
                      variant="outlined"
                    />
                  </Stack>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTime sx={{ mr: 1 }} fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {recipe.cookingTime} dakika
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Restaurant sx={{ mr: 1 }} fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {recipe.servings} kişilik
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    onClick={() => handleFavoriteToggle(recipe)}
                    color={recipe.isFavorite ? 'primary' : 'default'}
                  >
                    {recipe.isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton>
                    <Share />
                  </IconButton>
                  <Box sx={{ ml: 'auto' }}>
                    <Rating value={recipe.rating} readOnly size="small" />
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
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