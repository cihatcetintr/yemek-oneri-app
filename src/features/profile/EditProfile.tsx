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
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface UserProfile {
  displayName: string;
  email: string;
  bio: string;
  preferences: {
    cuisine: string[];
    dietary: string[];
  };
}

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    displayName: 'Ahmet Şef',
    email: 'ahmet@example.com',
    bio: 'Yemek yapmayı seven bir amatör şef',
    preferences: {
      cuisine: ['Türk', 'İtalyan'],
      dietary: ['Vejetaryen'],
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Firebase profil güncelleme işlemi
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simüle edilmiş API çağrısı
      navigate('/profile');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate(-1)}>
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
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                    }}
                  >
                    {profile.displayName.charAt(0)}
                  </Avatar>
                  <IconButton
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

              {/* Form Fields */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ad Soyad"
                  value={profile.displayName}
                  onChange={(e) =>
                    setProfile({ ...profile, displayName: e.target.value })
                  }
                  required
                  sx={{ mb: 3 }}
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
                  sx={{ mb: 3 }}
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
                  sx={{ mb: 3 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tercih Edilen Mutfaklar"
                  value={profile.preferences.cuisine.join(', ')}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        cuisine: e.target.value.split(',').map((s) => s.trim()),
                      },
                    })
                  }
                  helperText="Virgülle ayırarak birden fazla mutfak ekleyebilirsiniz"
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Diyet Tercihleri"
                  value={profile.preferences.dietary.join(', ')}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        dietary: e.target.value.split(',').map((s) => s.trim()),
                      },
                    })
                  }
                  helperText="Virgülle ayırarak birden fazla diyet tercihi ekleyebilirsiniz"
                  sx={{ mb: 3 }}
                />
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
    </Container>
  );
}; 