import { Button } from '../views/components/ui/Button'

export function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo ao Template 🚀</h1>
      <p className="text-gray-600 mb-8">Seu template frontend com React + TypeScript + Tailwind</p>
      <div className="flex gap-4 justify-center">
        <Button variant="primary">Começar</Button>
        <Button variant="secondary">Saiba mais</Button>
      </div>
    </div>
  )
}
