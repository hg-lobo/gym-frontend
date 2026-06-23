// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Perfil from './pages/Perfil';

// Layouts
import LayoutAdmin from './components/LayoutAdmin';
import LayoutCliente from './components/LayoutCliente';
import LayoutEntrenador from './components/LayoutEntrenador';

// Páginas de control de rutas
import DashboardRouter from './pages/DashboardRouter';

// Páginas admin
import DashboardAdmin from './pages/admin/DashboardAdmin';
import Usuarios from './pages/admin/Usuarios';
import Maquinas from './pages/admin/Maquinas';
import Accesos from './pages/admin/Accesos';
import Entrenamientos from './pages/admin/Entrenamientos';
import Entrenados from './pages/admin/Entrenados';
import Roles from './pages/admin/Roles';
import Evolucion from './pages/admin/Evolucion';
import QR from './pages/admin/QR';
import Configuracion from './pages/admin/Configuracion';

// Páginas cliente
import DashboardCliente from './pages/cliente/DashboardCliente';
import RutinaSemanal from './pages/cliente/RutinaSemanal';
import DietaCliente from './pages/cliente/DietaCliente';
import QRCliente from './pages/cliente/QRCliente';

// Páginas entrenador
import DashboardEntrenador from './pages/entrenador/DashboardEntrenador';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA RAIZ */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        
        {/* Control central de redirección por Rol */}
        <Route path="/dashboard" element={<DashboardRouter />} />

        {/* 1. RUTAS DEL CLIENTE (idrol: 4) */}
        <Route path="/cliente" element={<LayoutCliente />}>
          <Route path="dashboard" element={<DashboardCliente />} />
          <Route path="rutinas" element={<RutinaSemanal />} />
          <Route path="dieta" element={<DietaCliente />} />
          <Route path="qr" element={<QRCliente />} />
        </Route>

        {/* 2. RUTAS DEL ENTRENADOR (idrol: 3) */}
        <Route path="/entrenador" element={<LayoutEntrenador />}>
          <Route path="dashboard" element={<DashboardEntrenador />} />
          <Route path="entrenados" element={<Entrenados />} />
          <Route path="entrenamientos" element={<Entrenamientos />} />
          <Route path="evolucion" element={<Evolucion />} />
        </Route>
        
        {/* 3. RUTAS DEL ADMIN (idrol: 1) */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="maquinas" element={<Maquinas />} />
          <Route path="accesos" element={<Accesos />} />
          <Route path="entrenamientos" element={<Entrenamientos />} />
          <Route path="entrenados" element={<Entrenados />} />
          <Route path="roles" element={<Roles />} />
          <Route path="evolucion" element={<Evolucion />} />
          <Route path="qr" element={<QR />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;