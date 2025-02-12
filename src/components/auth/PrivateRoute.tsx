import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Giriş yapmamış kullanıcıyı login sayfasına yönlendir
    // Giriş yaptıktan sonra geri dönebilmesi için mevcut konumu state'e kaydet
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 