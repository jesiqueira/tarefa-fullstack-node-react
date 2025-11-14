export type TaskStatus = 'pendente' | 'em_progresso' | 'concluida';

export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  status: TaskStatus;
  usuarioId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  titulo: string;
  descricao: string;
  status?: TaskStatus;
}

export interface UpdateTaskData {
  titulo?: string;
  descricao?: string;
  status?: TaskStatus;
}