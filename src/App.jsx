// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import DashboardRouter from './pages/DashboardRouter';  // ← IMPORTAR

// Layout y páginas admin
import LayoutAdmin from './components/LayoutAdmin';
import Usuarios from './pages/admin/Usuarios';
import Maquinas from './pages/admin/Maquinas';
import Accesos from './pages/admin/Accesos';
import Entrenamientos from './pages/admin/Entrenamientos';
import Entrenados from './pages/admin/Entrenados';
import Roles from './pages/admin/Roles';
import Evolucion from './pages/admin/Evolucion';
import QR from './pages/admin/QR';
import Configuracion from './pages/admin/Configuracion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA RAIZ - Redirige a login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        
        {/* Dashboard con Layout */}
        <Route path="/dashboard" element={<LayoutAdmin />}>
          <Route index element={<DashboardRouter />} />  {/* ← NUEVO */}
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
