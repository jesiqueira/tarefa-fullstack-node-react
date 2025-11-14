import React from 'react'
import type { Task, TaskStatus, CreateTaskData } from '../types'
import type { User } from '@/types'
import { TaskForm } from './TaskForm'
import { TaskList } from './TaskList'

interface TaskManagerProps {
  user: User
  tasks: Task[]
  isLoading: boolean
  onLogout: () => void
  onCreateTask: (taskData: CreateTaskData) => Promise<Task>
  onUpdateTaskStatus: (taskId: number, status: TaskStatus) => Promise<Task>
  onDeleteTask: (taskId: number) => Promise<void>
}

export const TaskManager: React.FC<TaskManagerProps> = ({ user, tasks, isLoading, onLogout, onCreateTask, onUpdateTaskStatus, onDeleteTask }) => {
  // Handler para criar Tarefa que ignora o retorno (converte Promise<Task> para Promise<void>)
  const handleCreateTask = async (taskData: CreateTaskData): Promise<void> => {
    await onCreateTask(taskData)
  }
  const handleUpdateTaskStatus = async (taskId: number, status: TaskStatus): Promise<void> => {
    await onUpdateTaskStatus(taskId, status)
    // não precisamos fazer nada com tarefa retornada
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Olá, {user.nome}</span>
              <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />
          </div>

          {/* Lista de Tarefas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Minhas Tarefas ({tasks.length})</h2>
              <TaskList tasks={tasks} onUpdateStatus={handleUpdateTaskStatus} onDelete={onDeleteTask} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
