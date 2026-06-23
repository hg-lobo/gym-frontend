// src/pages/cliente/DashboardCliente.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const DashboardCliente = () => {
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

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gym-dark">
        <div className="text-gym-neon animate-pulse font-mono tracking-widest">
          SINCRONIZANDO PERFIL...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gym-dark via-gym-dark-secondary to-gym-dark space-y-6 pb-10">
      
      {/* HEADER CYBERPUNK */}
      <header className="border-b border-gym-neon/10 bg-gym-dark-secondary/40 backdrop-blur-md p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gym-neon/10 border border-gym-neon/30 flex items-center justify-center text-xl font-bold text-gym-neon font-mono">
              {user.nombre?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-gym-white flex items-center gap-2">
                GYM<span className="text-gym-neon">SYSTEM</span>
              </h1>
              <p className="text-gym-gray-light text-xs font-mono">
                {user.nombre} {user.apellido} • <span className="text-gym-neon/80 font-bold">{user.rol || 'Cliente'}</span>
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="border border-gym-danger/30 bg-gym-danger/10 text-gym-danger text-xs font-mono px-4 py-2 rounded-xl hover:bg-gym-danger hover:text-gym-white transition-all duration-300 uppercase tracking-wider font-bold"
          >
            Salir
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-5xl mx-auto px-4 space-y-8">
        
        {/* INDICADORES CLAVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Tarjeta 1 - Progreso */}
          <div className="card border-gym-neon/10 p-5 rounded-2xl bg-gym-dark-secondary/30 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute -right-2 -bottom-4 text-gym-neon/5 font-mono text-6xl font-black select-none">
              FIT
            </div>
            <div className="text-gym-gray font-mono text-xs uppercase tracking-widest font-bold">
              Mi Progreso
            </div>
            <div className="text-gym-white text-3xl font-black font-mono mt-2 tracking-tight">
              --
            </div>
            <div className="text-gym-gray-light text-xs mt-1">
              Última medición registrada
            </div>
          </div>

          {/* Tarjeta 2 - Entrenamientos */}
          <div className="card border-gym-neon/10 p-5 rounded-2xl bg-gym-dark-secondary/30 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute -right-2 -bottom-4 text-gym-neon/5 font-mono text-6xl font-black select-none">
              GYM
            </div>
            <div className="text-gym-gray font-mono text-xs uppercase tracking-widest font-bold">
              Entrenamientos
            </div>
            <div className="text-gym-white text-3xl font-black font-mono mt-2 tracking-tight text-gym-neon shadow-neon-text">
              0
            </div>
            <div className="text-gym-gray-light text-xs mt-1">
              Asistencias completadas este mes
            </div>
          </div>

        </div>

        {/* SECCIÓN MENÚ DE OPCIONES */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gym-gray font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gym-neon"></span>
            Mi Espacio Personal
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Opción QR */}
            <div className="group card border-gym-neon/10 p-5 rounded-2xl bg-gym-dark-secondary/20 hover:border-gym-neon/40 hover:bg-gym-neon/5 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div>
                <h3 className="text-gym-white text-base font-bold group-hover:text-gym-neon transition-colors">
                  Mi Acceso QR
                </h3>
                <p className="text-gym-gray-light text-xs mt-0.5">
                  Ver y escanear mi código de entrada
                </p>
              </div>
              <div className="text-gym-gray group-hover:text-gym-neon transition-colors font-mono text-xl">→</div>
            </div>

            {/* Opción Evolución */}
            <div className="group card border-gym-neon/10 p-5 rounded-2xl bg-gym-dark-secondary/20 hover:border-gym-neon/40 hover:bg-gym-neon/5 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div>
                <h3 className="text-gym-white text-base font-bold group-hover:text-gym-neon transition-colors">
                  Mi Evolución
                </h3>
                <p className="text-gym-gray-light text-xs mt-0.5">
                  Gráficas de mis cambios y medidas físicas
                </p>
              </div>
              <div className="text-gym-gray group-hover:text-gym-neon transition-colors font-mono text-xl">→</div>
            </div>

            {/* Opción Historial */}
            <div className="group card border-gym-neon/10 p-5 rounded-2xl bg-gym-dark-secondary/20 hover:border-gym-neon/40 hover:bg-gym-neon/5 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div>
                <h3 className="text-gym-white text-base font-bold group-hover:text-gym-neon transition-colors">
                  Mis Rutinas
                </h3>
                <p className="text-gym-gray-light text-xs mt-0.5">
                  Historial de ejercicios asignados por el Trainer
                </p>
              </div>
              <div className="text-gym-gray group-hover:text-gym-neon transition-colors font-mono text-xl">→</div>
            </div>

            {/* Opción Perfil */}
            <div className="group card border-gym-neon/10 p-5 rounded-2xl bg-gym-dark-secondary/20 hover:border-gym-neon/40 hover:bg-gym-neon/5 transition-all duration-300 cursor-pointer flex items-center justify-between">
              <div>
                <h3 className="text-gym-white text-base font-bold group-hover:text-gym-neon transition-colors">
                  Ajustes de Perfil
                </h3>
                <p className="text-gym-gray-light text-xs mt-0.5">
                  Gestionar mis datos y credenciales
                </p>
              </div>
              <div className="text-gym-gray group-hover:text-gym-neon transition-colors font-mono text-xl">→</div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default DashboardCliente;