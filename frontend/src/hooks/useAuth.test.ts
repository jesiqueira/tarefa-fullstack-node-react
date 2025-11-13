import { renderHook, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useAuth } from './useAuth'

// 1. Mock do Axios (nosso cliente 'api')
const mockPost = vi.fn()
vi.mock('../services/api', () => ({
  default: {
    post: mockPost,
    interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
  },
}))

// Mock do localStorage para testes
const localStorageMock = (function () {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()
Object.defineProperty(global, 'localStorage', { value: localStorageMock })

// Respostas de sucesso simuladas
const mockUser = { id: 1, nome: 'Teste', email: 'teste@api.com', createdAt: 'date', updatedAt: 'date' }
const mockLoginSuccess = { data: { success: true, token: 'mock-jwt-token', usuario: mockUser } }

describe('useAuth (API)', () => {
  beforeEach(() => {
    localStorageMock.clear()
    mockPost.mockClear()
  })

  it('deve iniciar com usuario nulo e isLoading falso', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.user).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })

  it('deve fazer login com sucesso e armazenar token/usuario', async () => {
    // Arrange
    mockPost.mockResolvedValueOnce(mockLoginSuccess)

    const { result } = renderHook(() => useAuth())

    // Act
    result.current.login('teste@api.com', 'senha123')

    // Assert: Verifica se o post foi chamado
    expect(mockPost).toHaveBeenCalledWith('/usuario/login', {
      email: 'teste@api.com',
      password: 'senha123',
    })

    // Espera a atualização do estado
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    // Verifica o estado após o login
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.error).toBeNull()

    // Verifica o localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', 'mock-jwt-token')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser))
  })

  it('deve falhar no login e definir a mensagem de erro', async () => {
    // Arrange
    const mockLoginFailure = { response: { data: { success: false, error: 'Credenciais inválidas' } } }
    mockPost.mockRejectedValueOnce(mockLoginFailure)

    const { result } = renderHook(() => useAuth())

    // Act
    result.current.login('invalido@api.com', 'erro')

    // Assert
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.user).toBeNull()
    expect(result.current.error).toBe('Credenciais inválidas')
  })

  it('deve fazer logout e limpar o estado/localStorage', async () => {
    // Prepara o estado inicial (como se estivesse logado)
    localStorageMock.setItem('authToken', 'test-token')
    localStorageMock.setItem('user', JSON.stringify(mockUser))

    const { result } = renderHook(() => useAuth())

    // Act
    result.current.logout()

    // Assert
    expect(result.current.user).toBeNull()
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken')
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
  })

  it('deve registrar e logar na sequencia', async () => {
    // 1. Mock Registro (sucesso, retorna objeto de usuário)
    const mockRegisterSuccess = { data: { id: 2, nome: 'Novo', email: 'novo@reg.com' } }
    mockPost.mockResolvedValueOnce(mockRegisterSuccess)

    // 2. Mock Login (sucesso)
    const mockNewUser = { ...mockUser, id: 2, nome: 'Novo', email: 'novo@reg.com' }
    mockPost.mockResolvedValueOnce({ data: { success: true, token: 'new-token', usuario: mockNewUser } })

    const { result } = renderHook(() => useAuth())

    // Act
    result.current.register('Novo Usuário', 'novo@reg.com', 'senhaforte')

    // Assert: Verifica que as duas chamadas foram feitas e o login foi o último
    await waitFor(() => expect(result.current.user).toEqual(mockNewUser))

    expect(mockPost).toHaveBeenCalledTimes(2)
    expect(mockPost.mock.calls[0][0]).toBe('/usuario/criar')
    expect(mockPost.mock.calls[1][0]).toBe('/usuario/login')
    expect(result.current.error).toBeNull()
  })
})
