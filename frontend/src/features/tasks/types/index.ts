export type TaskStatus = 'pendente' | 'em_progresso' | 'concluida'

export interface Task {
  id: number
  titulo: string
  descricao: string
  status: TaskStatus
  usuarioId: number
  createdAt: string
  updatedAt: string
}

export interface CreateTaskData {
  titulo: string
  descricao: string
  status?: TaskStatus
}

export interface UpdateTaskData {
  titulo?: string
  descricao?: string
  status?: TaskStatus
}

// Interface para os parâmetros de filtro (ADICIONE ESTA)
export interface TaskFilters {
  status?: string
  titulo?: string
  usuarioId?: number
  pagina?: number
  limite?: number
}

// Adicione estas interfaces para a resposta da API
export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  dados?: T[]
}

export interface ListaTarefasResponse {
  success: boolean
  dados: Task[]
  paginacao?: {
    pagina: number
    limite: number
    total: number
    totalPaginas: number
  }
}
