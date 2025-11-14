import { api } from '@/lib/axios';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

export const authAPI = {
  login: (credentials: LoginCredentials): Promise<{ data: AuthResponse }> =>
    api.post('/usuario/login', credentials),

  register: (userData: RegisterData): Promise<{ data: AuthResponse }> =>
    api.post('/usuario', userData),

  getMe: (): Promise<{ data: User }> =>
    api.get('/usuario/me'),

  updateUser: (userId: number, userData: Partial<User>): Promise<{ data: User }> =>
    api.put(`/usuario/${userId}`, userData),

  deleteUser: (userId: number): Promise<void> =>
    api.delete(`/usuario/${userId}`),
};