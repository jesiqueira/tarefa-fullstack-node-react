import { api } from '@/lib/axios'
import type { Task, CreateTaskData, UpdateTaskData, ApiResponse, ListaTarefasResponse } from '../types'

// Interface para os parâmetros de filtro
interface TaskFilters {
  status?: string
  titulo?: string
  usuarioId?: number
  pagina?: number
  limite?: number
}

export const tasksAPI = {
  getTasks: (params?: TaskFilters) => api.get<ListaTarefasResponse>('/tarefas', { params }),

  getTask: (id: number) => api.get<ApiResponse<Task>>(`/tarefas/${id}`),

  createTask: (data: CreateTaskData) => api.post<ApiResponse<Task>>('/tarefas', data),

  updateTask: (id: number, data: UpdateTaskData) => api.put<ApiResponse<Task>>(`/tarefas/${id}`, data),

  deleteTask: (id: number) => api.delete(`/tarefas/${id}`),
}
