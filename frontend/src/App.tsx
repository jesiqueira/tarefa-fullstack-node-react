import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/hooks/useAuth';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { TasksPage } from './pages/tasks/TasksPage';
import { LoadingSpinner } from './components/ui/LoadingSpinner/LoadingSpinner';
import { ErrorBoundary } from './components/error/ErrorBoundary';

function App() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <Routes>
          {/* Rotas Públicas */}
          {!isAuthenticated && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}

          {/* Rotas Protegidas */}
          {isAuthenticated && (
            <>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/:status" element={<TasksPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          )}
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;