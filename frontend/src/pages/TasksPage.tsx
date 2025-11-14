import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { TaskManager } from '@/features/tasks/components/TaskManager'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export const TasksPage: React.FC = () => {
  const { user, logout, isLoading: authLoading } = useAuth()
  const { tasks, isLoading: tasksLoading, createTask, updateTaskStatus, deleteTask } = useTasks()

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Redirecionar para login se não estiver autenticado
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Agora user é garantido que não é null
  return (
    <TaskManager
      user={user}
      tasks={tasks}
      isLoading={tasksLoading}
      onLogout={logout}
      onCreateTask={createTask}
      onUpdateTaskStatus={updateTaskStatus}
      onDeleteTask={deleteTask}
    />
  )
}