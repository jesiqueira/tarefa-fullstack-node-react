import { useState, useEffect, useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useAuthStore } from '@/stores/auth.store'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { user, setUser, clearUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  // useCallback para evitar recriação da função
  const checkAuth = useCallback(async () => {
    setIsLoading(true)
    try {
      const userData = await authService.getCurrentUser()
      setUser(userData)
    } catch {
      clearUser()
      localStorage.removeItem('authToken')
    } finally {
      setIsLoading(false)
    }
  }, [setUser, clearUser]) // Dependências do useCallback

  // Verificar autenticação ao carregar
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token && !user) {
      checkAuth()
    }
  }, [checkAuth, user]) // Agora checkAuth é estável

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.usuario)
      localStorage.setItem('authToken', data.token)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setUser(data.usuario)
      localStorage.setItem('authToken', data.token)
    },
  })

  const logout = useCallback(() => {
    clearUser()
    localStorage.removeItem('authToken')
    queryClient.clear()
  }, [clearUser, queryClient])

  return {
    user,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    isAuthenticated: !!user,
  }
}
