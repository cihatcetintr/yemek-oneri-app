import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  Stack,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';

interface UserPreferences {
  notifications: {
    recipes: boolean;
    ingredients: boolean;
    tips: boolean;
  };
  theme: 'light' | 'dark';
  language: string;
  cuisinePreferences: string[];
  dietaryRestrictions: string[];
}

interface UserProfile {
  displayName: string;
  email: string;
  bio: string;
  photoURL?: string;
  preferences: UserPreferences;
}

const CUISINE_OPTIONS = ['Türk', 'İtalyan', 'Çin', 'Hint', 'Meksika', 'Japon'];
const DIETARY_OPTIONS = ['Vejetaryen', 'Vegan', 'Glutensiz', 'Düşük Kalorili'];

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    displayName: 'Ahmet Şef',
    email: 'ahmet@example.com',
    bio: 'Yemek yapmayı seven bir amatör şef',
    preferences: {
      notifications: {
        recipes: true,
        ingredients: true,
        tips: true,
      },
      theme: 'light',
      language: 'tr',
      cuisinePreferences: ['Türk', 'İtalyan'],
      dietaryRestrictions: ['Vejetaryen'],
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Firebase profil güncelleme işlemi
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/profile');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = () => {
    // TODO: Fotoğraf yükleme işlemi
  };

  const toggleCuisine = (cuisine: string) => {
    const current = profile.preferences.cuisinePreferences;
    const updated = current.includes(cuisine)
      ? current.filter(c => c !== cuisine)
      : [...current, cuisine];

    setProfile({
      ...profile,
      preferences: {
        ...profile.preferences,
        cuisinePreferences: updated,
      },
    });
  };

  const toggleDietary = (diet: string) => {
    const current = profile.preferences.dietaryRestrictions;
    const updated = current.includes(diet)
      ? current.filter(d => d !== diet)
      : [...current, diet];

    setProfile({
      ...profile,
      preferences: {
        ...profile.preferences,
        dietaryRestrictions: updated,
      },
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate(-1)} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1">
              Profili Düzenle
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Avatar Section */}
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    src={profile.photoURL}
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      bgcolor: 'primary.main',
                    }}
                  >
                    {profile.displayName.charAt(0)}
                  </Avatar>
                  <IconButton
                    onClick={handlePhotoUpload}
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: -8,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </Box>
              </Grid>

              {/* Basic Info */}
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Ad Soyad"
                    value={profile.displayName}
                    onChange={(e) =>
                      setProfile({ ...profile, displayName: e.target.value })
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    label="E-posta"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    label="Biyografi"
                    multiline
                    rows={4}
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                  />
                </Stack>
              </Grid>

              {/* Quick Settings */}
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<NotificationsIcon />}
                    onClick={() => setShowPreferences(true)}
                    fullWidth
                    sx={{ justifyContent: 'flex-start', py: 2 }}
                  >
                    Bildirim Tercihleri
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<SecurityIcon />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start', py: 2 }}
                  >
                    Güvenlik Ayarları
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<LanguageIcon />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start', py: 2 }}
                  >
                    Dil Seçenekleri
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PaletteIcon />}
                    fullWidth
                    sx={{ justifyContent: 'flex-start', py: 2 }}
                  >
                    Tema Seçenekleri
                  </Button>
                </Stack>
              </Grid>

              {/* Cuisine Preferences */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Mutfak Tercihleri
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                  {CUISINE_OPTIONS.map((cuisine) => (
                    <Chip
                      key={cuisine}
                      label={cuisine}
                      onClick={() => toggleCuisine(cuisine)}
                      color={
                        profile.preferences.cuisinePreferences.includes(cuisine)
                          ? 'primary'
                          : 'default'
                      }
                      variant={
                        profile.preferences.cuisinePreferences.includes(cuisine)
                          ? 'filled'
                          : 'outlined'
                      }
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Stack>
              </Grid>

              {/* Dietary Restrictions */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Diyet Tercihleri
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {DIETARY_OPTIONS.map((diet) => (
                    <Chip
                      key={diet}
                      label={diet}
                      onClick={() => toggleDietary(diet)}
                      color={
                        profile.preferences.dietaryRestrictions.includes(diet)
                          ? 'secondary'
                          : 'default'
                      }
                      variant={
                        profile.preferences.dietaryRestrictions.includes(diet)
                          ? 'filled'
                          : 'outlined'
                      }
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 4 }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                İptal
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={loading}
              >
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>

      {/* Preferences Dialog */}
      <Dialog
        open={showPreferences}
        onClose={() => setShowPreferences(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Bildirim Tercihleri</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={profile.preferences.notifications.recipes}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        notifications: {
                          ...profile.preferences.notifications,
                          recipes: e.target.checked,
                        },
                      },
                    })
                  }
                />
              }
              label="Yeni Tarif Önerileri"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={profile.preferences.notifications.ingredients}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        notifications: {
                          ...profile.preferences.notifications,
                          ingredients: e.target.checked,
                        },
                      },
                    })
                  }
                />
              }
              label="Malzeme Hatırlatmaları"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={profile.preferences.notifications.tips}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        notifications: {
                          ...profile.preferences.notifications,
                          tips: e.target.checked,
                        },
                      },
                    })
                  }
                />
              }
              label="Pişirme İpuçları"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreferences(false)}>Tamam</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 