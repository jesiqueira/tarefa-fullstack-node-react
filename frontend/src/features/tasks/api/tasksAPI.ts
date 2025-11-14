import { api } from '@/lib/axios';
import type { Task, CreateTaskData, UpdateTaskData, ApiResponse } from '../types';

export const tasksAPI = {
  getTasks: (params?: any) => 
    api.get<ApiResponse<Task[]>>('/tarefas', { params }),

  getTask: (id: number) => 
    api.get<ApiResponse<Task>>(`/tarefas/${id}`),

  createTask: (data: CreateTaskData) => 
    api.post<ApiResponse<Task>>('/tarefas', data),

  updateTask: (id: number, data: UpdateTaskData) => 
    api.put<ApiResponse<Task>>(`/tarefas/${id}`, data),

  deleteTask: (id: number) => 
    api.delete(`/tarefas/${id}`),
};