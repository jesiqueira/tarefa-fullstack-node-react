import { tasksAPI } from '../api/tasksAPI';
import type { Task, CreateTaskData, UpdateTaskData } from '../types';

export class TaskService {
  async getTasks(filters?: any): Promise<Task[]> {
    const response = await tasksAPI.getTasks(filters);
    return response.data.dados || response.data.data || [];
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await tasksAPI.createTask(data);
    return response.data.data!;
  }

  async updateTask(id: number, data: UpdateTaskData): Promise<Task> {
    const response = await tasksAPI.updateTask(id, data);
    return response.data.data!;
  }

  async deleteTask(id: number): Promise<void> {
    await tasksAPI.deleteTask(id);
  }
}

export const taskService = new TaskService();