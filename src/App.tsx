import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/auth/PrivateRoute';
import Layout from './components/Layout';
import OnboardingPage from './pages/OnboardingPage';
import EditProfilePage from './pages/EditProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import IngredientsPage from './pages/IngredientsPage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import { SplashScreen } from '@capacitor/splash-screen';

// Kullanıcının onboarding'i tamamlayıp tamamlamadığını kontrol et
const hasCompletedOnboarding = () => {
  return localStorage.getItem('onboardingCompleted') === 'true';
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        // Minimum yükleme süresi
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Firebase ve diğer servislerin başlatılması burada yapılabilir
        
        setIsLoading(false);
        await SplashScreen.hide();
      } catch (error) {
        console.error('Error during app initialization:', error);
        setIsLoading(false);
        await SplashScreen.hide();
      }
    };

    initApp();
  }, []);

  if (isLoading) {
    return null; // Splash screen gösterilirken boş ekran
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="onboarding" element={<OnboardingPage />} />
              <Route path="profile/edit" element={<EditProfilePage />} />
              <Route path="ingredients" element={<IngredientsPage />} />
              <Route path="recipes" element={<RecipesPage />} />
              <Route path="recipes/:id" element={<RecipeDetailPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
