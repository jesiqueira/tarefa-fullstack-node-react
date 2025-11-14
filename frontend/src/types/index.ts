export interface User {
  id: number;
  nome: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  status: 'pendente' | 'em_progresso' | 'concluida';
  usuarioId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  dados?: T[];
}