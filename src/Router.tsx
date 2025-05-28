
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Entradas from './pages/Entradas';
import Saidas from './pages/Saidas';
import Relatorios from './pages/Relatorios';
import Recibos from './pages/Recibos';
import CadastroClientes from './pages/CadastroClientes';
import CadastroFuncionarios from './pages/CadastroFuncionarios';
import PrivateRoute from './components/PrivateRoute';

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/entradas" element={<PrivateRoute><Entradas /></PrivateRoute>} />
      <Route path="/saidas" element={<PrivateRoute><Saidas /></PrivateRoute>} />
      <Route path="/relatorios" element={<PrivateRoute><Relatorios /></PrivateRoute>} />
      <Route path="/recibos" element={<PrivateRoute><Recibos /></PrivateRoute>} />
      <Route path="/cadastro/clientes" element={<PrivateRoute><CadastroClientes /></PrivateRoute>} />
      <Route path="/cadastro/funcionarios" element={<PrivateRoute><CadastroFuncionarios /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
