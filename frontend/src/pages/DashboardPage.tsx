import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import { Header } from '@/components/layout/Header';
import { UserProfile } from '@/features/auth/components/UserProfile';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const DashboardPage: React.FC = () => {
  const { user, logout, isLoading: authLoading } = useAuth();
  const { tasks } = useTasks();

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-gray-600">Carregando...</span>
      </div>
    );
  }

  // Redirecionar para login se não estiver autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pendente').length,
    inProgress: tasks.filter(t => t.status === 'em_progresso').length,
    completed: tasks.filter(t => t.status === 'concluida').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Estatísticas */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-red-600">{stats.pending}</div>
                <div className="text-sm text-gray-500">Pendentes</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                <div className="text-sm text-gray-500">Em Progresso</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-gray-500">Concluídas</div>
              </div>
            </div>

            {/* Tarefas Recentes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Tarefas Recentes</h2>
              {tasks.length > 0 ? (
                tasks.slice(0, 5).map(task => (
                  <div key={task.id} className="border-b border-gray-200 py-3 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{task.titulo}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        task.status === 'concluida' ? 'bg-green-100 text-green-800' :
                        task.status === 'em_progresso' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Nenhuma tarefa encontrada.</p>
              )}
            </div>
          </div>

          {/* Perfil */}
          <div className="lg:col-span-1">
            <UserProfile user={user} />
          </div>
        </div>
      </main>
    </div>
  );
};