import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Chip,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

interface Ingredient {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
}

const categories = [
  'Sebzeler',
  'Meyveler',
  'Et Ürünleri',
  'Süt Ürünleri',
  'Bakliyat',
  'Baharat',
  'Diğer'
];

const units = [
  'adet',
  'gram',
  'kilogram',
  'litre',
  'mililitre',
  'su bardağı',
  'yemek kaşığı',
  'çay kaşığı',
  'paket'
];

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [searchTerm, setSearchTerm] = useState('');

  const { currentUser } = useAuth();

  useEffect(() => {
    loadIngredients();
  }, [currentUser]);

  const loadIngredients = async () => {
    if (!currentUser) return;
    
    try {
      const querySnapshot = await getDocs(collection(db, `users/${currentUser.uid}/ingredients`));
      const loadedIngredients = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Ingredient[];
      setIngredients(loadedIngredients);
    } catch (error) {
      console.error('Malzemeler yüklenirken hata:', error);
      showSnackbar('Malzemeler yüklenirken bir hata oluştu', 'error');
    }
  };

  const handleOpenDialog = (ingredient?: Ingredient) => {
    if (ingredient) {
      setEditingIngredient(ingredient);
      setName(ingredient.name);
      setCategory(ingredient.category);
      setQuantity(ingredient.quantity);
      setUnit(ingredient.unit);
      setExpiryDate(ingredient.expiryDate || '');
    } else {
      setEditingIngredient(null);
      resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setCategory('');
    setQuantity(1);
    setUnit('');
    setExpiryDate('');
    setEditingIngredient(null);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const ingredientData = {
        name,
        category,
        quantity,
        unit,
        expiryDate: expiryDate || null,
        updatedAt: new Date().toISOString()
      };

      if (editingIngredient) {
        await updateDoc(
          doc(db, `users/${currentUser.uid}/ingredients/${editingIngredient.id}`),
          ingredientData
        );
        showSnackbar('Malzeme başarıyla güncellendi', 'success');
      } else {
        await addDoc(
          collection(db, `users/${currentUser.uid}/ingredients`),
          ingredientData
        );
        showSnackbar('Malzeme başarıyla eklendi', 'success');
      }

      handleCloseDialog();
      loadIngredients();
    } catch (error) {
      console.error('Malzeme kaydedilirken hata:', error);
      showSnackbar('Malzeme kaydedilirken bir hata oluştu', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!currentUser) return;

    try {
      await deleteDoc(doc(db, `users/${currentUser.uid}/ingredients/${id}`));
      showSnackbar('Malzeme başarıyla silindi', 'success');
      loadIngredients();
    } catch (error) {
      console.error('Malzeme silinirken hata:', error);
      showSnackbar('Malzeme silinirken bir hata oluştu', 'error');
    }
  };

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Malzemelerim
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Malzeme Ara"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Malzeme Ekle
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredIngredients.map((ingredient) => (
          <Grid item xs={12} sm={6} md={4} key={ingredient.id}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" component="h3">
                  {ingredient.name}
                </Typography>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(ingredient)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(ingredient.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {ingredient.quantity} {ingredient.unit}
              </Typography>
              <Chip
                label={ingredient.category}
                size="small"
                sx={{ alignSelf: 'flex-start' }}
              />
              {ingredient.expiryDate && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Son Kullanma: {new Date(ingredient.expiryDate).toLocaleDateString()}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingIngredient ? 'Malzeme Düzenle' : 'Yeni Malzeme Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Malzeme Adı"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Kategori</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Kategori"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Miktar"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  fullWidth
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel>Birim</InputLabel>
                  <Select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    label="Birim"
                  >
                    {units.map((u) => (
                      <MenuItem key={u} value={u}>
                        {u}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Son Kullanma Tarihi"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingIngredient ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>

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