import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Favorite, Share } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Örnek tarif verisi
const sampleRecipes = [
  {
    id: 1,
    title: 'Mantarlı Risotto',
    image: 'https://source.unsplash.com/random/400x300?risotto',
    description: 'Kremsi İtalyan pilavı',
    cookingTime: '40 dk',
    difficulty: 'Orta'
  },
  {
    id: 2,
    title: 'Mercimek Çorbası',
    image: 'https://source.unsplash.com/random/400x300?soup',
    description: 'Geleneksel Türk çorbası',
    cookingTime: '30 dk',
    difficulty: 'Kolay'
  },
  // Daha fazla örnek tarif eklenebilir
];

export default function HomePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Hoş geldin mesajı */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hoş geldin, {currentUser?.displayName || 'Misafir'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bugün ne pişirmek istersin?
        </Typography>
      </Box>

      {/* Hızlı erişim butonları */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/ingredients')}
          >
            <AddIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Malzeme Ekle</Typography>
          </Paper>
        </Grid>
        {/* Diğer hızlı erişim butonları eklenebilir */}
      </Grid>

      {/* Önerilen tarifler */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Önerilen Tarifler
      </Typography>
      <Grid container spacing={4}>
        {sampleRecipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {recipe.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {recipe.cookingTime} • {recipe.difficulty}
                  </Typography>
                  <Box>
                    <IconButton size="small">
                      <Favorite />
                    </IconButton>
                    <IconButton size="small">
                      <Share />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Daha fazla tarif butonu */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/recipes')}
        >
          Daha Fazla Tarif Gör
        </Button>
      </Box>
    </Container>
  );
} 