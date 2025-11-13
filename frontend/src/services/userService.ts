// src/services/userService.ts

import api from './axiosInstance';
import type { ApiResponse } from '../models/api';
import type { Usuario } from '../models/user';

export const userService = {
  register: async (data: { nome: string; email: string; password: string }): Promise<ApiResponse<Usuario>> => {
    const response = await api.post('/usuario', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }): Promise<ApiResponse<Usuario>> => {
    const response = await api.post('/usuario/login', data);
    return response.data;
  },

  getUsuarioLogado: async (): Promise<ApiResponse<Usuario>> => {
    const response = await api.get('/usuario/me');
    return response.data;
  },

  updateUsuario: async (data: Partial<Usuario>): Promise<ApiResponse<Usuario>> => {
    const response = await api.put('/usuario', data);
    return response.data;
  },

  deleteUsuario: async (): Promise<ApiResponse<null>> => {
    const response = await api.delete('/usuario');
    return response.data;
  },
};