import type { TaskStatus } from '../types';

export const STATUS_MAP: Record<TaskStatus, { label: string; color: string; icon: string }> = {
  pendente: {
    label: 'Pendente',
    color: 'bg-red-500',
    icon: '⏰'
  },
  em_progresso: {
    label: 'Em Progresso',
    color: 'bg-yellow-500',
    icon: '🛠️'
  },
  concluida: {
    label: 'Concluída',
    color: 'bg-green-500',
    icon: '✅'
  },
};