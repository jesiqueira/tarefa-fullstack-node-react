// src/controllers/useTasks.ts
import { useState, useEffect, useCallback } from 'react'
import { taskService } from '../services/taskService'
import type { Tarefa } from '../models/task'
import type { ApiResponse, Paginacao } from '../models/api'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Tarefa[]>([])
  const [pagination, setPagination] = useState<Paginacao>({
    pagina: 1,
    limite: 25,
    total: 0,
    totalPaginas: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(
    async (page: number = 1, status?: string) => {
      try {
        setLoading(true)
        const res: ApiResponse<Tarefa[]> = await taskService.getTarefas({
          pagina: page,
          limite: pagination.limite,
          ...(status && { status }),
        })

        if (res.success && res.dados) {
          setTasks(res.dados)
          if (res.paginacao) setPagination(res.paginacao)
        } else {
          setError(res.message || 'Erro ao carregar tarefas')
        }
      } catch {
        setError('Falha na comunicação com a API')
      } finally {
        setLoading(false)
      }
    },
    [pagination.limite],
  )

  useEffect(() => {
    fetchTasks(pagination.pagina)
  }, [fetchTasks, pagination.pagina])

  const createTask = useCallback(
    async (titulo: string, descricao: string) => {
      try {
        setLoading(true)
        const res = await taskService.createTarefa({ titulo, descricao })
        if (res.success) {
          await fetchTasks(pagination.pagina)
        } else {
          setError(res.message || 'Erro ao criar tarefa')
        }
      } catch {
        setError('Falha na comunicação com a API')
      } finally {
        setLoading(false)
      }
    },
    [fetchTasks, pagination.pagina],
  )

  const updateTask = useCallback(
    async (id: number, data: Partial<Tarefa>) => {
      try {
        setLoading(true)
        const res = await taskService.updateTarefa(id, data)
        if (res.success) {
          await fetchTasks(pagination.pagina)
        } else {
          setError(res.message || 'Erro ao atualizar tarefa')
        }
      } catch {
        setError('Falha na comunicação com a API')
      } finally {
        setLoading(false)
      }
    },
    [fetchTasks, pagination.pagina],
  )

  const deleteTask = useCallback(
    async (id: number) => {
      try {
        setLoading(true)
        const res = await taskService.deleteTarefa(id)
        if (res.success) {
          await fetchTasks(pagination.pagina)
        } else {
          setError(res.message || 'Erro ao deletar tarefa')
        }
      } catch {
        setError('Falha na comunicação com a API')
      } finally {
        setLoading(false)
      }
    },
    [fetchTasks, pagination.pagina],
  )

  return { tasks, pagination, loading, error, fetchTasks, createTask, updateTask, deleteTask }
}
