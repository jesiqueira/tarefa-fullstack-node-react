import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface AuthScreenProps {
  onLogin: (email: string, password: string) => Promise<void>
  onRegister: (userData: { nome: string; email: string; password: string }) => Promise<void>
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        await onLogin(formData.email, formData.password)
      } else {
        await onRegister({
          nome: formData.nome,
          email: formData.email,
          password: formData.password,
        })
      }
    } catch (error) {
      console.error('Erro na autenticação:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setFormData({ nome: '', email: '', password: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">TaskFlow</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">Organize suas tarefas de forma simples e eficiente</p>
        </div>

        <div className="max-w-md mx-auto lg:max-w-4xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Hero Section - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Por que usar o TaskFlow?</h2>
                <ul className="space-y-4">
                  {[
                    '✅ Organize tarefas por status',
                    '🚀 Interface intuitiva e rápida',
                    '📱 Acesse de qualquer dispositivo',
                    '🔒 Seus dados protegidos',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="text-lg mr-3">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card de Login/Registro */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{isLogin ? 'Entre na sua conta' : 'Crie sua conta'}</h2>
                <p className="text-gray-600 mt-2">
                  {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
                  <button onClick={switchMode} className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    {isLogin ? 'Cadastre-se' : 'Faça login'}
                  </button>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <Input label="Nome completo" name="nome" value={formData.nome} onChange={handleChange} required={!isLogin} placeholder="Seu nome" />
                )}

                <Input label="E-mail" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="seu@email.com" />

                <Input
                  label="Senha"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Sua senha"
                  minLength={6}
                />

                <Button type="submit" isLoading={isLoading} className="w-full">
                  {isLoading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar conta'}
                </Button>
              </form>

              {/* Divisor */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <span>GitHub</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
