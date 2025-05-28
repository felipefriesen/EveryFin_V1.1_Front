import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem('token');
  console.log('[PrivateRoute] Token encontrado:', token);

  if (!token) {
    console.warn('[PrivateRoute] Nenhum token encontrado. Redirecionando para /login');
    return <Navigate to="/login" replace />;
  }

  console.log('[PrivateRoute] Acesso autorizado.');
  return children;
}
