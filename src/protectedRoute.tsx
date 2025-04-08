import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext);

  if (!auth?.token) {
    // Redirect to login if no token is found
    return <Navigate to="/signIn" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
