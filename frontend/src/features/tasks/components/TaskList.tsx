import React from 'react';
import type { Task, TaskStatus } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onUpdateStatus: (taskId: number, status: TaskStatus) => void;
  onDelete: (taskId: number) => void;
  isLoading?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onUpdateStatus, 
  onDelete, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-500 mt-2">Carregando tarefas...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
        <p className="text-gray-400 text-sm">Crie sua primeira tarefa!</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};