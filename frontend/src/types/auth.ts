// src/types/auth.ts

/**
 * Define a estrutura básica esperada para o objeto de usuário.
 */
export interface User {
  id: string
  email: string
  name: string
  // Outros campos importantes do usuário...
}

/**
 * Define a estrutura da resposta da API de autenticação.
 * Pode conter sucesso (token, usuario) ou falha (message, error).
 */
export interface AuthResponse {
  token?: string
  usuario?: User
  message?: string
  error?: string
}
