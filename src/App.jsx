// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Perfil from './pages/Perfil';

// Layout y páginas admin
import LayoutAdmin from './components/LayoutAdmin';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA RAIZ - Redirige a login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        
        {/* Rutas admin con Layout */}
        <Route path="/" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="admin/usuarios" element={<Usuarios />} />
          <Route path="admin/maquinas" element={<Maquinas />} />
          <Route path="admin/accesos" element={<Accesos />} />
          <Route path="admin/entrenamientos" element={<Entrenamientos />} />
          <Route path="admin/entrenados" element={<Entrenados />} />
          <Route path="admin/roles" element={<Roles />} />
          <Route path="admin/evolucion" element={<Evolucion />} />
          <Route path="admin/qr" element={<QR />} />
          <Route path="admin/configuracion" element={<Configuracion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
