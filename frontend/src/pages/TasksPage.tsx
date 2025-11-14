import React from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import { TaskManager } from '@/features/tasks/components/TaskManager';

export const TasksPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { tasks, isLoading, createTask, updateTaskStatus, deleteTask } = useTasks();

  return (
    <TaskManager
      user={user!}
      tasks={tasks}
      isLoading={isLoading}
      onLogout={logout}
      onCreateTask={createTask}
      onUpdateTaskStatus={updateTaskStatus}
      onDeleteTask={deleteTask}
    />
  );
};