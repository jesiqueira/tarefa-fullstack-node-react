// src/hooks/useAuth.ts

import React from 'react'
import api from '../services/api'
import type { Usuario, ApiResponse } from '../types'

interface AuthHook {
  user: Usuario | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (nome: string, email: string, password: string) => Promise<void>
  setError: (msg: string | null) => void
}

// Chaves de localStorage
const TOKEN_KEY = 'authToken'
const USER_KEY = 'user'

export const useAuth = (): AuthHook => {
  const [user, setUser] = React.useState<Usuario | null>(() => {
    const storedUser = localStorage.getItem(USER_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  })

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Efeito para sincronizar o estado de usuário com o localStorage no início
  React.useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem(USER_KEY)
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }
    // Opcional: listener para mudanças em outras abas
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleAuthResponse = (res: ApiResponse<void>) => {
    if (res.token && res.usuario) {
      localStorage.setItem(TOKEN_KEY, res.token)
      localStorage.setItem(USER_KEY, JSON.stringify(res.usuario))
      setUser(res.usuario)
      setError(null)
    } else {
      throw new Error(res.message || res.error || 'Resposta de autenticação inválida.')
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await api.post<ApiResponse<void>>('/usuario/login', { email, password })
      handleAuthResponse(res.data)
    } catch (e: any) {
      const msg = e.response?.data?.error || 'Credenciais inválidas. Tente novamente.'
      setError(msg)
      console.error('Erro de Login:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (nome: string, email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // O teste indica que criarUsuario retorna o objeto do usuário (sem token)
      await api.post<ApiResponse<Usuario>>('/usuario/criar', { nome, email, password })

      // Após o registro, tenta logar automaticamente
      await login(email, password)
    } catch (e: any) {
      const msg = e.response?.data?.error || 'Falha no registro. Email já em uso?'
      setError(msg)
      console.error('Erro de Registro:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
    setError(null)
  }

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    setError,
  }
}
