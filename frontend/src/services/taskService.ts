// src/services/taskService.ts

import api from './axiosInstance'
import type { ApiResponse } from '../models/api'
import type { Tarefa } from '../models/task'

export const taskService = {
  createTarefa: async (data: { titulo: string; descricao: string; status?: string }): Promise<ApiResponse<Tarefa>> => {
    const response = await api.post('/tarefas', data)
    return response.data
  },

  getTarefas: async (params?: { status?: string; titulo?: string; pagina?: number; limite?: number }): Promise<ApiResponse<Tarefa[]>> => {
    const response = await api.get('/tarefas', { params })
    return response.data
  },

  getTarefaById: async (id: number): Promise<ApiResponse<Tarefa>> => {
    const response = await api.get(`/tarefas/${id}`)
    return response.data
  },

  updateTarefa: async (id: number, data: Partial<Tarefa>): Promise<ApiResponse<Tarefa>> => {
    const response = await api.put(`/tarefas/${id}`, data)
    return response.data
  },

  deleteTarefa: async (id: number): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/tarefas/${id}`)
    return response.data
  },

  getTarefasDoUsuario: async (usuarioId: number): Promise<ApiResponse<Tarefa[]>> => {
    const response = await api.get(`/tarefas/usuario/${usuarioId}`)
    return response.data
  },

  getTarefasPorStatus: async (status: string): Promise<ApiResponse<Tarefa[]>> => {
    const response = await api.get(`/tarefas/status/${status}`)
    return response.data
  },
}
