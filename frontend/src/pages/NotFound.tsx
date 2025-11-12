import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-8">Página não encontrada</p>
      <Link to="/">
        <Button variant="primary">Voltar para Home</Button>
      </Link>
    </div>
  )
}
