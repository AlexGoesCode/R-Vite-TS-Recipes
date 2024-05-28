import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
  path: string;
  [key: string]: any; // This allows passing any additional props
}

const ProtectedRoute = ({
  element: Component,
  path,
  ...rest
}: ProtectedRouteProps) => {
  const { user } = useAuth();

  return (
    <Route
      path={path}
      {...rest}
      element={
        user ? <Component {...rest} /> : <Navigate to='/login' replace />
      }
    />
  );
};

export default ProtectedRoute;
