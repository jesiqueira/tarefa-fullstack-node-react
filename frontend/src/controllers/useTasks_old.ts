import { useState, useEffect, useCallback } from 'react'
import api from '../services/axiosInstance'
import type { Tarefa, TaskStatus, ApiResponse, Paginacao, type Usuario } from '../types'

interface TaskHook {
  tasks: Tarefa[]
  pagination: Paginacao
  isLoading: boolean
  error: string | null
  fetchTasks: (page?: number, status?: TaskStatus | 'todos') => Promise<void>
  addTask: (title: string, description: string) => Promise<void>
  updateTask: (taskId: number, data: Partial<Omit<Tarefa, 'id' | 'usuarioId'>>) => Promise<void>
  deleteTask: (taskId: number) => Promise<void>
}

export const useTasks = (user: Usuario | null, setError: (msg: string | null) => void): TaskHook => {
  const [tasks, setTasks] = useState<Tarefa[]>([])
  const [pagination, setPagination] = useState<Paginacao>({ pagina: 1, limite: 25, total: 0, totalPaginas: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [taskError, setTaskError] = useState<string | null>(null)

  // Função para buscar as tarefas do backend (Endpoint: /tarefa/listar)
  const fetchTasks = useCallback(
    async (page: number = 1, status: TaskStatus | 'todos' = 'todos') => {
      if (!user) return // Não carrega se não estiver logado

      setIsLoading(true)
      setTaskError(null)

      const queryParams = {
        pagina: page,
        limite: 25, // Limite fixo por enquanto
        ...(status !== 'todos' && { status }), // Adiciona status se não for 'todos'
      }

      try {
        const res = await api.get<ApiResponse<Tarefa[]>>('/tarefa/listar', {
          params: queryParams,
        })

        if (res.data.success && res.data.dados && res.data.paginacao) {
          setTasks(res.data.dados)
          setPagination(res.data.paginacao)
        } else {
          throw new Error(res.data.message || 'Falha ao carregar a lista de tarefas.')
        }
      } catch (e: any) {
        const msg = e.response?.data?.message || 'Erro ao comunicar com a API de tarefas.'
        setTaskError(msg)
        setError(msg)
      } finally {
        setIsLoading(false)
      }
    },
    [user, setError],
  )

  // Carrega tarefas no login e sempre que o usuário ou página/status mudar
  useEffect(() => {
    if (user) {
      fetchTasks(pagination.pagina)
    } else {
      setTasks([])
      setPagination({ pagina: 1, limite: 25, total: 0, totalPaginas: 0 })
    }
  }, [user, fetchTasks, pagination])

  // Função para adicionar nova tarefa (Endpoint: /tarefa/criar)
  const addTask = async (titulo: string, descricao: string) => {
    if (!user) return
    setTaskError(null)

    try {
      await api.post<ApiResponse<Tarefa>>('/tarefa/criar', {
        titulo,
        descricao,
        status: 'pendente' as TaskStatus, // Status inicial padrão, conforme o backend
      })
      // Recarrega a lista após o sucesso para ver o novo item
      await fetchTasks(1)
    } catch (e: any) {
      const msg = e.response?.data?.message || 'Falha ao salvar a nova tarefa.'
      setTaskError(msg)
      setError(msg)
    }
  }

  // Função para atualizar tarefa (Endpoint: /tarefa/atualizar/:id)
  const updateTask = async (taskId: number, data: Partial<Omit<Tarefa, 'id' | 'usuarioId'>>) => {
    if (!user) return
    setTaskError(null)

    try {
      await api.put<ApiResponse<Tarefa>>(`/tarefa/atualizar/${taskId}`, data)

      // Atualização otimista (opcional) ou recarga completa (mais seguro)
      await fetchTasks(pagination.pagina)
    } catch (e: any) {
      const msg = e.response?.data?.message || 'Falha ao atualizar a tarefa.'
      setTaskError(msg)
      setError(msg)
    }
  }

  // Função para deletar tarefa (Endpoint: /tarefa/deletar/:id)
  const deleteTask = async (taskId: number) => {
    if (!user) return
    setTaskError(null)

    try {
      await api.delete<ApiResponse<any>>(`/tarefa/deletar/${taskId}`)

      // Recarrega
      await fetchTasks(pagination.pagina)
    } catch (e: any) {
      const msg = e.response?.data?.message || 'Falha ao deletar a tarefa.'
      setTaskError(msg)
      setError(msg)
    }
  }

  return {
    tasks,
    pagination,
    isLoading,
    error: taskError,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  }
}
