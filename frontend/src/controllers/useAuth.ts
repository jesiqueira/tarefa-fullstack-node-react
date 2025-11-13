// src/controllers/useAuth.ts

import { useState, useEffect } from 'react'
import { userService } from '../services/userService'
import type { Usuario } from '../models/user'

export const useAuth = () => {
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Carrega usuário logado ao montar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const res = await userService.getUsuarioLogado()
        if (res.success && res.data) {
          setUser(res.data)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await userService.login({ email, password })
      if (res.success && res.token && res.usuario) {
        localStorage.setItem('authToken', res.token)
        localStorage.setItem('user', JSON.stringify(res.usuario))
        setUser(res.usuario)
      } else {
        setError(res.message || 'Erro ao fazer login')
      }
    } catch {
      setError('Falha na comunicação com a API')
    } finally {
      setLoading(false)
    }
  }

  const register = async (nome: string, email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await userService.register({ nome, email, password })
      if (res.success) {
        await login(email, password) // Login automático após cadastro
      } else {
        setError(res.message || 'Erro ao cadastrar')
      }
    } catch {
      setError('Falha na comunicação com a API')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  return { user, loading, error, login, register, logout }
}
