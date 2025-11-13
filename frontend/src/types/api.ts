// src/types/api.ts

import type { Usuario } from './user'

/**
 * Estrutura de Paginação
 * Usada para transportar metadados de listagens paginadas.
 */
export interface Paginacao {
  pagina: number
  limite: number
  total: number
  totalPaginas: number
}

/**
 * Estruturas de Resposta Padrão da API
 * T é um tipo genérico que representa o payload de dados específico da resposta
 * (ex: Tarefa para uma busca única, ou Tarefa[] para uma listagem).
 */
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T // Para operações de criação/busca única (ex: criarTarefa, buscarTarefaPorId)
  dados?: T[] // Para listagens (ex: listarTarefas)
  paginacao?: Paginacao // Apenas para listagens
  token?: string // Apenas para login
  usuario?: T extends Usuario ? T : undefined // Tenta inferir se T é Usuario ou define como undefined.
  error?: string // Para erros 400/500
}
