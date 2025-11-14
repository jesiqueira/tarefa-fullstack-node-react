import React, { useState } from 'react';

interface AuthScreenProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (userData: any) => Promise<void>;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            TaskFlow
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Organize suas tarefas de forma simples e eficiente
          </p>
        </div>

        <div className="max-w-md mx-auto lg:max-w-4xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            
            {/* Hero Section - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Por que usar o TaskFlow?
                </h2>
                <ul className="space-y-4">
                  {[
                    '✅ Organize tarefas por status',
                    '🚀 Interface intuitiva e rápida',
                    '📱 Acesse de qualquer dispositivo',
                    '🔒 Seus dados protegidos'
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
                <h2 className="text-2xl font-bold text-gray-900">
                  {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
                </h2>
                <p className="text-gray-600 mt-2">
                  {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    {isLogin ? 'Cadastre-se' : 'Faça login'}
                  </button>
                </p>
              </div>

              <form className="space-y-4">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Sua senha"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Criar conta')}
                </button>
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
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    <span>Google</span>
                  </button>
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    <span>GitHub</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};