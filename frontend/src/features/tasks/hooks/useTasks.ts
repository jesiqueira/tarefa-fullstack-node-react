import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { taskService } from '../services/taskService'
import type { CreateTaskData, UpdateTaskData, TaskStatus, Task, TaskFilters } from '../types'

export const useTasks = (filters: TaskFilters = {}) => {
  const queryClient = useQueryClient()

  const tasksQuery = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => taskService.getTasks(filters),
  })

  const createMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskData }) => taskService.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const createTask = async (data: CreateTaskData): Promise<Task> => {
    return createMutation.mutateAsync(data)
  }

  const updateTask = async (id: number, data: UpdateTaskData): Promise<Task> => {
    return updateMutation.mutateAsync({ id, data })
  }

  const updateTaskStatus = async (id: number, status: TaskStatus): Promise<Task> => {
    return updateTask(id, { status })
  }

  const deleteTask = async (id: number): Promise<void> => {
    return deleteMutation.mutateAsync(id)
  }

  return {
    tasks: tasksQuery.data || [],
    isLoading: tasksQuery.isLoading,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  }
}
