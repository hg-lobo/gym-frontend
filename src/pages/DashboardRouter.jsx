// src/pages/DashboardRouter.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';
import DashboardAdmin from './admin/DashboardAdmin';
import DashboardRecep from './recepcionista/DashboardRecep';
import DashboardEntrenador from './entrenador/DashboardEntrenador';
import DashboardCliente from './cliente/DashboardCliente';

const DashboardRouter = () => {
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.idrol) {
    case 1:
      return <DashboardAdmin />;
    case 2:
      return <DashboardRecep />;
    case 3:
      return <DashboardCliente />;
    case 4:
      return <DashboardEntrenador />;
    default:
      return <DashboardCliente />;
  }
};

export default DashboardRouter;