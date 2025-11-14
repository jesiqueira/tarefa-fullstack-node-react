import { authAPI } from '../api/authAPI';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await authAPI.login(credentials);
    return response.data;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await authAPI.register(userData);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await authAPI.getMe();
    return response.data;
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    const response = await authAPI.updateUser(userId, userData);
    return response.data;
  }

  async deleteUser(userId: number): Promise<void> {
    await authAPI.deleteUser(userId);
  }
}

export const authService = new AuthService();