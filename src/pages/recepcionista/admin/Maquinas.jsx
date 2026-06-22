// src/pages/admin/Maquinas.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import maquinaService from '../../services/maquinaService';
import authService from '../../services/authService';

const Maquinas = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMaquina, setSelectedMaquina] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    modelo: '',
    serial: '',
    estado: '',
    fechaAdquisicion: ''
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.idrol !== 1) {
      navigate('/dashboard');
      return;
    }
    loadMaquinas();
  }, [navigate]);

  const loadMaquinas = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await maquinaService.getAll();
      setMaquinas(data);
    } catch (err) {
      setError('Error al cargar las máquinas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setFormData({
      nombre: '',
      modelo: '',
      serial: '',
      estado: '',
      fechaAdquisicion: ''
    });
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const openEditModal = (maquina) => {
    setIsEditing(true);
    setFormData({
      nombre: maquina.nombre || '',
      modelo: maquina.modelo || '',
      serial: maquina.serial || '',
      estado: maquina.estado || '',
      fechaAdquisicion: maquina.fechaadquisicion ? maquina.fechaadquisicion.split('T')[0] : ''
    });
    setSelectedMaquina(maquina);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const openDeleteModal = (maquina) => {
    setSelectedMaquina(maquina);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const dataToSend = {
        nombre: formData.nombre,
        modelo: formData.modelo || null,
        serial: formData.serial || null,
        estado: formData.estado || null,
        fechaAdquisicion: formData.fechaAdquisicion || null
      };

      if (isEditing) {
        await maquinaService.update(selectedMaquina.idmaquina, dataToSend);
        setSuccess('Máquina actualizada correctamente');
      } else {
        await maquinaService.create(dataToSend);
        setSuccess('Máquina creada correctamente');
      }

      setShowModal(false);
      loadMaquinas();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar la máquina');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await maquinaService.delete(selectedMaquina.idmaquina);
      setSuccess('Máquina eliminada correctamente');
      setShowDeleteModal(false);
      loadMaquinas();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al eliminar la máquina');
    } finally {
      setLoading(false);
    }
  };

  // Filtrado
  const filteredMaquinas = maquinas.filter(maquina => {
    const search = searchTerm.toLowerCase();
    return (
      maquina.nombre?.toLowerCase().includes(search) ||
      maquina.modelo?.toLowerCase().includes(search) ||
      maquina.serial?.toLowerCase().includes(search) ||
      maquina.estado?.toLowerCase().includes(search)
    );
  });

  // Paginacion
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMaquinas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMaquinas.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Estilo para estado
  const getEstadoStyle = (estado) => {
    const colors = {
      'Activa': '#10B981',
      'Mantenimiento': '#F59E0B',
      'Inactiva': '#EF4444',
      'En reparación': '#8B5CF6'
    };
    return {
      color: colors[estado] || '#6B7280',
      fontWeight: '500'
    };
  };

  if (loading && maquinas.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gym-neon">Cargando máquinas...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gym-white tracking-tight">
            Máquinas
          </h1>
          <p className="text-gym-gray text-sm mt-0.5">
            Gestiona las máquinas del gimnasio
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-gym-neon text-gym-dark px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Máquina
        </button>
      </div>

      {/* Mensajes */}
      {error && (
        <div className="bg-gym-danger/10 border border-gym-danger/30 text-gym-danger px-4 py-2.5 rounded-lg mb-3 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-gym-success/10 border border-gym-success/30 text-gym-success px-4 py-2.5 rounded-lg mb-3 text-sm">
          {success}
        </div>
      )}

      {/* Buscador */}
      <div className="mb-3 md:mb-4">
        <input
          type="text"
          placeholder="Buscar máquina por nombre, modelo, serial..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:max-w-md input-gym"
        />
      </div>

      {/* Tabla */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gym-gray/10">
                <th className="text-left py-2.5 md:py-3 px-3 md:px-4 text-gym-gray font-medium text-xs uppercase tracking-wider whitespace-nowrap">Nombre</th>
                <th className="text-left py-2.5 md:py-3 px-3 md:px-4 text-gym-gray font-medium text-xs uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">Modelo</th>
                <th className="text-left py-2.5 md:py-3 px-3 md:px-4 text-gym-gray font-medium text-xs uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">Serial</th>
                <th className="text-left py-2.5 md:py-3 px-3 md:px-4 text-gym-gray font-medium text-xs uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Estado</th>
                <th className="text-left py-2.5 md:py-3 px-3 md:px-4 text-gym-gray font-medium text-xs uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">Adquisición</th>
                <th className="text-left py-2.5 md:py-3 px-3 md:px-4 text-gym-gray font-medium text-xs uppercase tracking-wider whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gym-gray text-sm">
                    No hay máquinas registradas
                  </td>
                </tr>
              ) : (
                currentItems.map((maquina) => (
                  <tr key={maquina.idmaquina} className="border-b border-gym-gray/5 hover:bg-gym-card/30 transition-colors">
                    <td className="py-2.5 md:py-3 px-3 md:px-4 text-gym-white text-sm font-medium whitespace-nowrap">
                      {maquina.nombre}
                    </td>
                    <td className="py-2.5 md:py-3 px-3 md:px-4 text-gym-gray text-sm whitespace-nowrap hidden sm:table-cell">
                      {maquina.modelo || '-'}
                    </td>
                    <td className="py-2.5 md:py-3 px-3 md:px-4 text-gym-gray text-sm whitespace-nowrap hidden lg:table-cell">
                      {maquina.serial || '-'}
                    </td>
                    <td className="py-2.5 md:py-3 px-3 md:px-4 text-sm whitespace-nowrap hidden md:table-cell" style={getEstadoStyle(maquina.estado)}>
                      {maquina.estado || 'Sin estado'}
                    </td>
                    <td className="py-2.5 md:py-3 px-3 md:px-4 text-gym-gray text-sm whitespace-nowrap hidden lg:table-cell">
                      {maquina.fechaadquisicion ? new Date(maquina.fechaadquisicion).toLocaleDateString('es-ES') : '-'}
                    </td>
                    <td className="py-2.5 md:py-3 px-3 md:px-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <button
                          onClick={() => openEditModal(maquina)}
                          className="text-gym-gray hover:text-gym-white transition-colors p-1"
                          title="Editar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => openDeleteModal(maquina)}
                          className="text-gym-danger hover:text-gym-danger/80 transition-colors p-1"
                          title="Eliminar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer paginacion */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 md:px-4 py-3 border-t border-gym-gray/10">
          <span className="text-gym-gray text-xs md:text-sm">
            Mostrando {filteredMaquinas.length > 0 ? indexOfFirstItem + 1 : 0}-
            {Math.min(indexOfLastItem, filteredMaquinas.length)} de {filteredMaquinas.length} máquinas
          </span>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm ${
                currentPage === 1 
                  ? 'text-gym-gray cursor-not-allowed' 
                  : 'text-gym-white hover:bg-gym-card'
              }`}
            >
              Anterior
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`px-2.5 md:px-3 py-1 rounded text-xs md:text-sm ${
                    currentPage === pageNum
                      ? 'bg-gym-neon/20 text-gym-neon'
                      : 'text-gym-white hover:bg-gym-card'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm ${
                currentPage === totalPages || totalPages === 0
                  ? 'text-gym-gray cursor-not-allowed' 
                  : 'text-gym-white hover:bg-gym-card'
              }`}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Modal Crear/Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gym-dark-secondary rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gym-gray/10">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-gym-white">
                  {isEditing ? 'Editar Máquina' : 'Nueva Máquina'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gym-gray hover:text-gym-white transition-colors"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="md:col-span-2">
                    <label className="text-gym-gray-light text-xs md:text-sm block mb-1">Nombre *</label>
                    <input
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="input-gym"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gym-gray-light text-xs md:text-sm block mb-1">Modelo</label>
                    <input
                      name="modelo"
                      value={formData.modelo}
                      onChange={handleInputChange}
                      className="input-gym"
                    />
                  </div>
                  <div>
                    <label className="text-gym-gray-light text-xs md:text-sm block mb-1">Serial</label>
                    <input
                      name="serial"
                      value={formData.serial}
                      onChange={handleInputChange}
                      className="input-gym"
                    />
                  </div>
                  <div>
                    <label className="text-gym-gray-light text-xs md:text-sm block mb-1">Estado</label>
                    <select
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      className="input-gym"
                    >
                      <option value="">Seleccionar estado</option>
                      <option value="Activa">Activa</option>
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Inactiva">Inactiva</option>
                      <option value="En reparación">En reparación</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gym-gray-light text-xs md:text-sm block mb-1">Fecha de Adquisición</label>
                    <input
                      name="fechaAdquisicion"
                      type="date"
                      value={formData.fechaAdquisicion}
                      onChange={handleInputChange}
                      className="input-gym"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-3 md:pt-4 border-t border-gym-gray/10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-secondary w-full sm:w-auto order-2 sm:order-1"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full sm:w-auto order-1 sm:order-2 disabled:opacity-50"
                  >
                    {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Eliminar */}
      {showDeleteModal && selectedMaquina && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gym-dark-secondary rounded-2xl max-w-sm w-full border border-gym-gray/10 mx-4">
            <div className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-gym-white mb-3 md:mb-4">
                Eliminar Máquina
              </h2>
              <p className="text-gym-gray-light text-sm md:text-base mb-4 md:mb-6">
                ¿Estas seguro de que deseas eliminar la máquina 
                <span className="text-gym-white font-medium"> {selectedMaquina.nombre}</span>?
                <span className="block text-gym-warning text-xs md:text-sm mt-2">
                  Esta acción no se puede deshacer.
                </span>
              </p>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn-secondary w-full sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-gym-danger text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gym-danger/80 transition-colors disabled:opacity-50 w-full sm:w-auto"
                >
                  {loading ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maquinas;