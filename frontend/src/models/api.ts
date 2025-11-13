import type { Usuario } from './user'

/**
 * Estrutura de Paginação
 */
export interface Paginacao {
  pagina: number
  limite: number
  total: number
  totalPaginas: number
}

/**
 * Estrutura padrão de resposta da API
 */
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T // Para operações únicas (ex.: criar, buscar por ID)
  dados?: T
  paginacao?: Paginacao
  token?: string // Apenas para login
  usuario?: T extends Usuario ? T : undefined // Tenta inferir se T é Usuario ou define
  error?: string // Para erros
}
