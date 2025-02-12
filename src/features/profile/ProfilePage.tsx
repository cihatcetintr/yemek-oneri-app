import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Card,
  CardContent,
  Stack,
  Chip,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';

const FAVORITE_RECIPES = [
  { id: 1, name: 'Mantarlı Risotto', date: '2024-02-01' },
  { id: 2, name: 'Mercimek Çorbası', date: '2024-02-03' },
  { id: 3, name: 'Karnıyarık', date: '2024-02-05' },
];

const RECENT_ACTIVITIES = [
  { id: 1, action: 'Tarif eklendi', recipe: 'Patates Püresi', date: '2024-02-05' },
  { id: 2, action: 'Tarif denendi', recipe: 'Mercimek Çorbası', date: '2024-02-03' },
  { id: 3, action: 'Favorilere eklendi', recipe: 'Mantarlı Risotto', date: '2024-02-01' },
];

export const ProfilePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Profile Header */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(45deg, #4ECDC4 30%, #71D7D0 90%)',
            color: 'white',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid white',
                }}
              >
                AS
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                Ahmet Şef
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon fontSize="small" />
                  ahmet@example.com
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon fontSize="small" />
                  Ocak 2024'ten beri üye
                </Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ bgcolor: 'white', color: 'primary.main' }}
              >
                Profili Düzenle
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={4}>
          {/* Stats */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                İstatistikler
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <FavoriteIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Favori Tarifler"
                    secondary="12 tarif"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RestaurantIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Denenen Tarifler"
                    secondary="8 tarif"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <HistoryIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Son Aktivite"
                    secondary="2 gün önce"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Favorite Recipes */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Favori Tarifler
              </Typography>
              <Grid container spacing={2}>
                {FAVORITE_RECIPES.map((recipe) => (
                  <Grid item xs={12} sm={6} key={recipe.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          {recipe.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Favorilere eklenme: {recipe.date}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Recent Activity */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Son Aktiviteler
              </Typography>
              <List>
                {RECENT_ACTIVITIES.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {activity.recipe}
                            <Chip
                              label={activity.action}
                              size="small"
                              color={
                                activity.action === 'Tarif eklendi'
                                  ? 'success'
                                  : activity.action === 'Tarif denendi'
                                  ? 'primary'
                                  : 'secondary'
                              }
                            />
                          </Box>
                        }
                        secondary={activity.date}
                      />
                    </ListItem>
                    {index < RECENT_ACTIVITIES.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}; 