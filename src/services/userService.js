// src/services/userService.js
import api from './api';

const userService = {
  // Obtener todos los usuarios
  getAll: async () => {
    const response = await api.get('/usuarios');
    return response.data;
  },

  // Obtener un usuario por ID
  getById: async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  // Crear un nuevo usuario
  create: async (data) => {
    const response = await api.post('/usuarios', data);
    return response.data;
  },

  // Actualizar un usuario
  update: async (id, data) => {
    const response = await api.put(`/usuarios/${id}`, data);
    return response.data;
  },

  // Cambiar contraseña
  changePassword: async (id, nuevaClave) => {
    const response = await api.put(`/usuarios/${id}/password`, { clave: nuevaClave });
    return response.data;
  },

  // Activar/desactivar usuario
  toggleStatus: async (id, activo) => {
    const response = await api.patch(`/usuarios/${id}/status`, { activo });
    return response.data;
  },

  // NOTA: Eliminar físicamente (solo si es necesario)
  // delete: async (id) => { ... }
};

export default userService;