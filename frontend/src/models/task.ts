// src/models/task.ts

/**
 * Tipos de Status de Tarefa
 * Define os possíveis estados de uma tarefa.
 */
export type TaskStatus = 'pendente' | 'em_progresso' | 'concluida'

/**
 * Estrutura de Tarefa (Modelo de Squelize/Postgres)
 * Interface principal para representar uma tarefa no sistema.
 */
export interface Tarefa {
  id: number
  titulo: string
  descricao: string
  status: TaskStatus
  usuarioId: number
  createdAt: string // Vindo do backend como string de data
  updatedAt: string
}

/**
 * Mapeamento de Status para UI
 * Utilizado para definir rótulos, cores e ícones na interface do usuário.
 * O 'as const' garante que este objeto seja imutável e com tipagem estrita.
 */
export const STATUS_MAP: Record<TaskStatus, { label: string; color: string; icon: string }> = {
  pendente: { label: 'Pendente', color: 'bg-red-500 hover:bg-red-600', icon: '⏰' },
  em_progresso: { label: 'Em Progresso', color: 'bg-yellow-500 hover:bg-yellow-600', icon: '🛠️' },
  concluida: { label: 'Concluída', color: 'bg-green-500 hover:bg-green-600', icon: '✅' },
} as const
