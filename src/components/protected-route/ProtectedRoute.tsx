import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  [key: string]: any; // This allows passing any additional props
}

const ProtectedRoute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
