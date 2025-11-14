import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import type { CreateTaskData, UpdateTaskData, TaskStatus } from '../types';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskService.getTasks(),
  });

  const createMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskData }) =>
      taskService.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const createTask = async (data: CreateTaskData) => {
    return createMutation.mutateAsync(data);
  };

  const updateTask = async (id: number, data: UpdateTaskData) => {
    return updateMutation.mutateAsync({ id, data });
  };

  const updateTaskStatus = async (id: number, status: TaskStatus) => {
    return updateTask(id, { status });
  };

  const deleteTask = async (id: number) => {
    return deleteMutation.mutateAsync(id);
  };

  return {
    tasks: tasksQuery.data || [],
    isLoading: tasksQuery.isLoading,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  };
};