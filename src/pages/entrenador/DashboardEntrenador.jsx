// src/pages/entrenador/DashboardEntrenador.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const DashboardEntrenador = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Estados de control para la inyección de datos
  const [entrenados, setEntrenados] = useState([
    { id: 1, nombre: 'Rodrigo Torres', cedula: '27444333', plan: 'Definición', estado: 'Entrenando Ahora' },
    { id: 2, nombre: 'Carlos Mendoza', cedula: '26111222', plan: 'Volumen', estado: 'Pendiente' },
    { id: 3, nombre: 'Ana Valbuena', cedula: '29555666', plan: 'Mantenimiento', estado: 'Completado' },
  ]);

  const [entrenadoSeleccionado, setEntrenadoSeleccionado] = useState(null);
  const [tipoGestion, setTipoGestion] = useState(''); // 'entrenamientos' o 'dieta'

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [navigate]);

  const abrirGestion = (entrenado, tipo) => {
    setEntrenadoSeleccionado(entrenado);
    setTipoGestion(tipo);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gym-dark flex items-center justify-center">
        <div className="text-gym-white font-mono text-xs">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* CABECERA (Adaptada al entorno general sin duplicar barras de navegación) */}
      <div>
        <h2 className="text-xl font-black text-gym-white tracking-tight uppercase">Dashboard</h2>
        <p className="text-gym-gray-light text-xs font-mono">
          Instructor: {user?.nombre} {user?.apellido} • Panel de Gestión Táctica
        </p>
      </div>

      {/* MÉTRICAS DE CONTROL (Nombres oficiales del sistema) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="card bg-gym-dark-secondary/30 border border-gym-neon/10 p-4 rounded-xl">
          <span className="text-[10px] text-gym-gray block uppercase font-bold">Entrenados Asignados</span>
          <span className="text-2xl font-black text-gym-white">{entrenados.length}</span>
        </div>
        <div className="card bg-gym-dark-secondary/30 border border-gym-neon/10 p-4 rounded-xl">
          <span className="text-[10px] text-gym-gray block uppercase font-bold">Accesos Hoy</span>
          <span className="text-2xl font-black text-gym-neon">1</span>
        </div>
        <div className="card bg-gym-dark-secondary/30 border border-gym-neon/10 p-4 rounded-xl">
          <span className="text-[10px] text-gym-gray block uppercase font-bold">Evolución Registrada</span>
          <span className="text-2xl font-black text-gym-white">0</span>
        </div>
      </div>

      {/* SECCIÓN PRINCIPAL: ENTRENADOS */}
      <div className="card bg-gym-dark-secondary/20 border border-gym-neon/5 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-gym-white font-mono uppercase mb-4 tracking-wider">&gt;_ Entrenados</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs text-gym-gray-light">
            <thead>
              <tr className="border-b border-gym-neon/10 text-gym-gray uppercase font-bold">
                <th className="py-3 px-4">Usuarios</th>
                <th className="py-3 px-4">Cédula</th>
                <th className="py-3 px-4">Evolución / Plan</th>
                <th className="py-3 px-4">Accesos</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gym-neon/5">
              {entrenados.map((entrenado) => (
                <tr key={entrenado.id} className="hover:bg-gym-dark-secondary/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-gym-white">{entrenado.nombre}</td>
                  <td className="py-4 px-4 text-gym-neon">{entrenado.cedula}</td>
                  <td className="py-4 px-4">{entrenado.plan}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      entrenado.estado === 'Entrenando Ahora' ? 'bg-gym-neon/10 text-gym-neon border border-gym-neon/20' :
                      entrenado.estado === 'Pendiente' ? 'bg-gym-gray/10 text-gym-gray' : 'bg-gym-dark border border-gym-neon/5 text-gym-gray-light'
                    }`}>
                      {entrenado.estado}
                    </span>
                  </td>
                  <td className="py-4 px-4 flex gap-2 justify-center">
                    <button 
                      onClick={() => abrirGestion(entrenado, 'entrenamientos')}
                      className="px-3 py-1.5 rounded-lg bg-gym-dark border border-gym-neon/20 text-gym-white hover:bg-gym-neon/10 hover:text-gym-neon transition-all"
                    >
                      + Entrenamientos
                    </button>
                    <button 
                      onClick={() => abrirGestion(entrenado, 'dieta')}
                      className="px-3 py-1.5 rounded-lg bg-gym-dark border border-gym-neon/20 text-gym-white hover:bg-gym-neon/10 hover:text-gym-neon transition-all"
                    >
                      + Dieta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORMULARIO DE ASIGNACIÓN INTERNA */}
      {entrenadoSeleccionado && (
        <div className="card bg-gym-dark-secondary/50 border border-gym-neon/20 rounded-2xl p-6 mt-6 backdrop-blur-md">
          <div className="flex justify-between items-center border-b border-gym-neon/10 pb-3 mb-4">
            <h3 className="text-sm font-bold text-gym-neon font-mono uppercase">
              // {tipoGestion === 'entrenamientos' ? 'Asignar Entrenamientos' : 'Asignar Dieta'} -&gt; {entrenadoSeleccionado.nombre}
            </h3>
            <button 
              onClick={() => setEntrenadoSeleccionado(null)}
              className="text-gym-gray hover:text-gym-white font-mono text-xs"
            >
              [Cerrar]
            </button>
          </div>

          <form className="space-y-4 font-mono text-xs" onSubmit={(e) => { e.preventDefault(); setEntrenadoSeleccionado(null); }}>
            {tipoGestion === 'entrenamientos' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gym-gray mb-1 uppercase">Día</label>
                  <select className="w-full bg-gym-dark border border-gym-neon/20 rounded-xl p-3 text-gym-white focus:outline-none focus:border-gym-neon">
                    <option>Lunes</option>
                    <option>Martes</option>
                    <option>Miércoles</option>
                    <option>Jueves</option>
                    <option>Viernes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gym-gray mb-1 uppercase">Ejercicios (Series x Repeticiones)</label>
                  <textarea 
                    rows="3"
                    placeholder="Ej: Press Banca | 4x12"
                    className="w-full bg-gym-dark border border-gym-neon/20 rounded-xl p-3 text-gym-white focus:outline-none focus:border-gym-neon resize-none"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-gym-gray mb-1 uppercase">Menú Alimenticio</label>
                  <textarea 
                    rows="2"
                    placeholder="Ej: 150g de pechuga de pollo..."
                    className="w-full bg-gym-dark border border-gym-neon/20 rounded-xl p-3 text-gym-white focus:outline-none focus:border-gym-neon resize-none"
                  />
                </div>
                <div>
                  <label className="block text-gym-gray mb-1 uppercase">Prot (g)</label>
                  <input type="text" placeholder="e.g. 140g" className="w-full bg-gym-dark border border-gym-neon/20 rounded-xl p-3 text-gym-white focus:outline-none focus:border-gym-neon" />
                </div>
                <div>
                  <label className="block text-gym-gray mb-1 uppercase">Carbs (g)</label>
                  <input type="text" placeholder="e.g. 200g" className="w-full bg-gym-dark border border-gym-neon/20 rounded-xl p-3 text-gym-white focus:outline-none focus:border-gym-neon" />
                </div>
                <div>
                  <label className="block text-gym-gray mb-1 uppercase">Grasas (g)</label>
                  <input type="text" placeholder="e.g. 60g" className="w-full bg-gym-dark border border-gym-neon/20 rounded-xl p-3 text-gym-white focus:outline-none focus:border-gym-neon" />
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button 
                type="submit" 
                className="bg-gym-neon text-gym-dark font-bold px-5 py-2.5 rounded-xl uppercase hover:bg-gym-white transition-all shadow-[0_0_15px_rgba(0,242,254,0.2)]"
              >
                Guardar Configuración
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DashboardEntrenador;