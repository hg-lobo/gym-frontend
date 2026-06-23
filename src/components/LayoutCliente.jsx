// src/components/LayoutCliente.jsx
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const LayoutCliente = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser() || { nombre: 'Usuario', rol: 'Cliente' };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gym-dark text-gym-white font-sans">
      
      {/* BARRA LATERAL EXCLUSIVA DEL CLIENTE */}
      <aside className="w-64 border-r border-gym-neon/10 bg-gym-dark-secondary/50 flex flex-col justify-between p-4 hidden md:flex">
        <div className="space-y-6">
          {/* Logo */}
          <div className="px-2">
            <h1 className="text-xl font-black tracking-tight text-gym-white">
              GYM<span className="text-gym-neon">ZONE</span>
            </h1>
            <p className="text-[10px] font-mono text-gym-neon uppercase tracking-widest mt-1">Panel de Atleta</p>
          </div>

          {/* Menú de Navegación */}
          <nav className="space-y-1">
            <NavLink 
              to="/cliente/dashboard" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-gym-neon/10 text-gym-neon border border-gym-neon/20 font-bold' : 'text-gym-gray-light hover:bg-gym-card/40 hover:text-gym-white'}`}
            >
               &gt; Mi Dashboard
            </NavLink>

            {/* RUTINAS */}
            <div className="pt-4 px-4 text-[10px] font-mono uppercase tracking-widest text-gym-gray font-bold">
              Mis Entrenamientos
            </div>
            <NavLink 
              to="/cliente/rutinas" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-gym-neon/10 text-gym-neon border border-gym-neon/20 font-bold' : 'text-gym-gray-light hover:bg-gym-card/40 hover:text-gym-white'}`}
            >
               # Rutina Semanal
            </NavLink>

            {/* NUTRICIÓN / PLAN ALIMENTICIO */}
            <div className="pt-4 px-4 text-[10px] font-mono uppercase tracking-widest text-gym-gray font-bold">
              Nutrición & Dieta
            </div>
            <NavLink 
              to="/cliente/dieta" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-gym-neon/10 text-gym-neon border border-gym-neon/20 font-bold' : 'text-gym-gray-light hover:bg-gym-card/40 hover:text-gym-white'}`}
            >
               + Plan Dietético
            </NavLink>

            <div className="pt-4 px-4 text-[10px] font-mono uppercase tracking-widest text-gym-gray font-bold">
              Herramientas
            </div>
            <NavLink 
              to="/cliente/qr" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-gym-neon/10 text-gym-neon border border-gym-neon/20 font-bold' : 'text-gym-gray-light hover:bg-gym-card/40 hover:text-gym-white'}`}
            >
               [QR] Código de Acceso
            </NavLink>
          </nav>
        </div>

        {/* Botón de Cerrar Sesión inferior */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gym-danger hover:bg-gym-danger/10 transition-all border border-transparent hover:border-gym-danger/20 mt-auto"
        >
           [x] Cerrar Sesión
        </button>
      </aside>

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-gym-neon/5 bg-gym-dark-secondary/20 p-4 flex justify-between items-center md:hidden">
          <h1 className="text-lg font-black tracking-tight text-gym-white">GYM<span className="text-gym-neon">ZONE</span></h1>
          <button onClick={handleLogout} className="text-gym-danger text-xs font-mono">Salir</button>
        </header>

        <div className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default LayoutCliente;