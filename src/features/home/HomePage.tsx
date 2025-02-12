import React from 'react';
import { Container, Typography, Grid, Paper, Box, Card, CardContent, Button, Chip, Stack } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import KitchenIcon from '@mui/icons-material/Kitchen';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const quickStats = [
    { label: 'Toplam Malzeme', value: '12', icon: <KitchenIcon color="primary" /> },
    { label: 'Yapılabilir Tarifler', value: '5', icon: <RestaurantIcon color="secondary" /> },
    { label: 'Popüler Tarifler', value: '8', icon: <TrendingUpIcon color="success" /> },
  ];

  const suggestedRecipes = [
    { id: 1, name: 'Mantarlı Risotto', difficulty: 'Orta', time: '45 dk', ingredients: 8 },
    { id: 2, name: 'Mercimek Çorbası', difficulty: 'Kolay', time: '30 dk', ingredients: 6 },
    { id: 3, name: 'Karnıyarık', difficulty: 'Zor', time: '60 dk', ingredients: 10 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Hero Section */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)',
            color: 'white',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Hoş Geldiniz 👋
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Malzemelerinizle neler pişirebileceğinizi keşfedin
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/ingredients')}
          >
            Malzeme Ekle
          </Button>
        </Paper>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {quickStats.map((stat) => (
            <Grid item xs={12} sm={4} key={stat.label}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {stat.icon}
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Suggested Recipes */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Önerilen Tarifler
        </Typography>
        <Grid container spacing={3}>
          {suggestedRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {recipe.name}
                  </Typography>
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
                    <Chip label={recipe.time} size="small" />
                    <Chip label={`${recipe.ingredients} malzeme`} size="small" />
                  </Stack>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                  >
                    Tarifi Gör
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}; 