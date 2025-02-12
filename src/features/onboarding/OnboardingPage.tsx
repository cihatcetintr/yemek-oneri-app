import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  MobileStepper,
  Paper,
  useTheme,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KitchenIcon from '@mui/icons-material/Kitchen';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

const steps = [
  {
    label: 'Malzemelerinizi Ekleyin',
    description: 'Mutfağınızdaki malzemeleri kolayca ekleyin ve takip edin.',
    icon: <KitchenIcon sx={{ fontSize: 100, color: 'primary.main' }} />,
  },
  {
    label: 'Tarifleri Keşfedin',
    description: 'Malzemelerinize uygun yüzlerce tarif arasından seçim yapın.',
    icon: <RestaurantIcon sx={{ fontSize: 100, color: 'primary.main' }} />,
  },
  {
    label: 'Yemek Yapın',
    description: 'Adım adım tarifleri takip ederek lezzetli yemekler pişirin.',
    icon: <LocalDiningIcon sx={{ fontSize: 100, color: 'primary.main' }} />,
  },
];

export const OnboardingPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    if (activeStep === maxSteps - 1) {
      // Son adımda ise ana sayfaya yönlendir
      navigate('/');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Paper
          elevation={0}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
            my: 4,
            bgcolor: 'transparent',
          }}
        >
          <Box
            sx={{
              height: 255,
              maxWidth: 400,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            {steps[activeStep].icon}
          </Box>

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            {steps[activeStep].label}
          </Typography>

          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 400 }}
          >
            {steps[activeStep].description}
          </Typography>
        </Paper>

        <Box sx={{ mb: 4 }}>
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              bgcolor: 'transparent',
              '& .MuiMobileStepper-dot': {
                width: 12,
                height: 12,
                mx: 0.5,
              },
            }}
            nextButton={
              <Button
                size="large"
                onClick={handleNext}
                sx={{ px: 4 }}
                variant="contained"
              >
                {activeStep === maxSteps - 1 ? 'Başla' : 'İleri'}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="large"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ px: 4 }}
              >
                <KeyboardArrowLeft />
                Geri
              </Button>
            }
          />

          {activeStep !== maxSteps - 1 && (
            <Button
              onClick={handleSkip}
              sx={{ mt: 2, width: '100%' }}
              variant="text"
            >
              Geç
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}; 