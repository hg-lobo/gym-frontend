// src/pages/DashboardRouter.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const DashboardRouter = () => {
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Forzamos la conversión a número para evitar fallos de tipo de dato
  switch (Number(user.idrol)) {
    case 1:
      return <Navigate to="/admin/dashboard" replace />;
    case 2:
      return <Navigate to="/recepcionista/dashboard" replace />;
    case 3:
      return <Navigate to="/entrenador/dashboard" replace />; // ← Envía al entrenador a su área
    case 4:
      return <Navigate to="/cliente/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default DashboardRouter;