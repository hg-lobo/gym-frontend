// src/pages/admin/DashboardAdmin.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const DashboardAdmin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-gym-neon">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card border-gym-neon/20">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gym-neon/10 border-2 border-gym-neon/30 flex items-center justify-center text-2xl font-bold text-gym-neon">
            {user.nombre?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gym-white">
              Bienvenido, {user.nombre}
            </h1>
            <p className="text-gym-gray-light">
              <span className="text-gym-neon font-medium">{user.rol || 'Administrador'}</span>
            </p>
            <p className="text-gym-gray text-sm">{user.correo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;