// src/components/LayoutAdmin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import authService from '../services/authService';

const LayoutAdmin = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null); // ← NUEVO
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener usuario actual
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Actualizar menu activo segun la ruta
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') setActiveMenu('dashboard');
    else if (path === '/dashboard/usuarios') setActiveMenu('usuarios');
    else if (path === '/dashboard/maquinas') setActiveMenu('maquinas');
    else if (path === '/dashboard/accesos') setActiveMenu('accesos');
    else if (path === '/dashboard/entrenamientos') setActiveMenu('entrenamientos');
    else if (path === '/dashboard/entrenados') setActiveMenu('entrenados');
    else if (path === '/dashboard/roles') setActiveMenu('roles');
    else if (path === '/dashboard/evolucion') setActiveMenu('evolucion');
    else if (path === '/dashboard/qr') setActiveMenu('qr');
    else if (path === '/dashboard/configuracion') setActiveMenu('configuracion');
  }, [location]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    if (isMobile) setSidebarOpen(false);
    
    switch (menuId) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'usuarios':
        navigate('/dashboard/usuarios');
        break;
      case 'maquinas':
        navigate('/dashboard/maquinas');
        break;
      case 'accesos':
        navigate('/dashboard/accesos');
        break;
      case 'entrenamientos':
        navigate('/dashboard/entrenamientos');
        break;
      case 'entrenados':
        navigate('/dashboard/entrenados');
        break;
      case 'roles':
        navigate('/dashboard/roles');
        break;
      case 'evolucion':
        navigate('/dashboard/evolucion');
        break;
      case 'qr':
        navigate('/dashboard/qr');
        break;
      case 'configuracion':
        navigate('/dashboard/configuracion');
        break;
      default:
        console.log(`Navegando a: ${menuId}`);
    }
  };

  const goToProfile = () => {
    navigate('/perfil');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // ================================
  // ICONOS (los mismos que ya tienes)
  // ================================
  const icons = {
    dashboard: ( /* SVG Dashboard */ ),
    users: ( /* SVG Usuarios */ ),
    machines: ( /* SVG Máquinas */ ),
    access: ( /* SVG Accesos */ ),
    training: ( /* SVG Entrenamientos */ ),
    trainers: ( /* SVG Entrenados */ ),
    roles: ( /* SVG Roles */ ),
    evolution: ( /* SVG Evolución */ ),
    qr: ( /* SVG QR */ ),
    settings: ( /* SVG Configuración */ ),
  };

  // ================================
  // MENÚ POR ROL
  // ================================
  const getMenuItems = () => {
    const rol = user?.idrol;

    // Menú base (visible para todos)
    const baseMenu = [
      { id: 'dashboard', label: 'Dashboard', icon: icons.dashboard }
    ];

    // Menú de Administrador (idrol: 1)
    const adminMenu = [
      { id: 'usuarios', label: 'Usuarios', icon: icons.users },
      { id: 'maquinas', label: 'Máquinas', icon: icons.machines },
      { id: 'accesos', label: 'Accesos', icon: icons.access },
      { id: 'entrenamientos', label: 'Entrenamientos', icon: icons.training },
      { id: 'entrenados', label: 'Entrenados', icon: icons.trainers },
      { id: 'roles', label: 'Roles', icon: icons.roles },
      { id: 'evolucion', label: 'Evolución', icon: icons.evolution },
      { id: 'qr', label: 'QR', icon: icons.qr },
      { id: 'configuracion', label: 'Configuración', icon: icons.settings },
    ];

    // Menú de Recepcionista (idrol: 2)
    const recepMenu = [
      { id: 'accesos', label: 'Accesos', icon: icons.access },
      { id: 'usuarios', label: 'Usuarios', icon: icons.users },
      { id: 'qr', label: 'QR', icon: icons.qr },
    ];

    // Menú de Entrenador (idrol: 4)
    const entrenadorMenu = [
      { id: 'entrenados', label: 'Mis Alumnos', icon: icons.trainers },
      { id: 'entrenamientos', label: 'Entrenamientos', icon: icons.training },
      { id: 'evolucion', label: 'Evolución', icon: icons.evolution },
    ];

    // Menú de Cliente (idrol: 3)
    const clienteMenu = [
      { id: 'qr', label: 'Mi QR', icon: icons.qr },
      { id: 'entrenamientos', label: 'Mis Entrenamientos', icon: icons.training },
      { id: 'evolucion', label: 'Mi Evolución', icon: icons.evolution },
    ];

    switch (rol) {
      case 1: return [...baseMenu, ...adminMenu];
      case 2: return [...baseMenu, ...recepMenu];
      case 3: return [...baseMenu, ...clienteMenu];
      case 4: return [...baseMenu, ...entrenadorMenu];
      default: return baseMenu;
    }
  };

  const menuItems = getMenuItems();

  // ================================
  // RENDER (el resto igual)
  // ================================
  return (
    <div className="min-h-screen bg-gym-dark flex flex-col md:flex-row text-gym-white">
      {/* Overlay para móvil */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/70 z-40 backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 w-72 bg-gym-dark-secondary border-r border-gym-gray/10 h-screen transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gym-gray/10">
              <span className="text-xl font-black bg-gradient-to-r from-gym-neon to-gym-neon/70 bg-clip-text text-transparent tracking-wide">
                Sistema Gimnasio
              </span>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gym-gray-light hover:text-gym-neon transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Menú */}
            <nav className="px-3 py-4 overflow-y-auto max-h-[calc(100vh-160px)]">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 mb-1 ${
                    activeMenu === item.id
                      ? 'bg-gym-neon/10 text-gym-neon border border-gym-neon/20 shadow-[0_0_15px_rgba(33,241,168,0.03)]'
                      : 'text-gym-gray-light hover:bg-gym-card hover:text-gym-neon'
                  }`}
                >
                  <span className={`flex-shrink-0 ${activeMenu === item.id ? 'text-gym-neon' : 'text-gym-gray-light'}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Logout */}
          <div className="px-3 py-4 border-t border-gym-gray/10 bg-gym-dark-secondary">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gym-gray-light hover:bg-gym-danger/10 hover:text-gym-danger font-bold transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <header className="sticky top-0 z-30 bg-gym-dark-secondary/90 backdrop-blur-md border-b border-gym-gray/10 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="md:hidden text-gym-gray-light hover:text-gym-neon transition-colors p-2 -ml-2"
                aria-label="Abrir menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-gym-white font-black text-lg tracking-tight truncate">
                {menuItems.find(item => item.id === activeMenu)?.label || 'Dashboard'}
              </h2>
            </div>

            <button
              onClick={goToProfile}
              className="flex items-center gap-2 text-gym-gray-light hover:text-gym-neon transition-colors text-sm font-semibold"
            >
              <span className="hidden sm:inline">Mi Perfil</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gym-dark">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
