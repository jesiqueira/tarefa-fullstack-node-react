import { tasksAPI } from '../api/tasksAPI'
import type { Task, CreateTaskData, UpdateTaskData, TaskFilters } from '../types'

export class TaskService {
  async getTasks(filters: TaskFilters = {}): Promise<Task[]> {
    const response = await tasksAPI.getTasks(filters)
    return response.data.dados || []
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await tasksAPI.createTask(data)

    if (!response.data.data) {
      throw new Error('Falha ao criar tarefa: resposta sem dados')
    }

    return response.data.data
  }

  async updateTask(id: number, data: UpdateTaskData): Promise<Task> {
    const response = await tasksAPI.updateTask(id, data)

    if (!response.data.data) {
      throw new Error('Falha ao atualizar tarefa: resposta sem dados')
    }

    return response.data.data
  }

  async deleteTask(id: number): Promise<void> {
    await tasksAPI.deleteTask(id)
  }
}

export const taskService = new TaskService()
