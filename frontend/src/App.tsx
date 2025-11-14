import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { TasksPage } from '@/pages/TasksPage'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

function App() {
  const { user, isLoading } = useAuth()

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-gray-600">Carregando...</span>
      </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        {/* Rotas Públicas (acessíveis apenas para usuários NÃO autenticados) */}
        {!user && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Redireciona qualquer rota não autenticada para login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* Rotas Protegidas (acessíveis apenas para usuários autenticados) */}
        {user && (
          <>
            {/* Redireciona raiz para dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            {/* Redireciona qualquer rota desconhecida para dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App
