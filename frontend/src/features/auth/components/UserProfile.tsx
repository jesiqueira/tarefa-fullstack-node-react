import React from 'react'
import type { User } from '@/types'

interface UserProfileProps {
  user: User
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Perfil do Usuário</h2>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-500">Nome</label>
          <p className="text-gray-900">{user.nome}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">E-mail</label>
          <p className="text-gray-900">{user.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Membro desde</label>
          <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </div>
  )
}
