import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const RegisterPage: React.FC = () => {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crie sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            entre na sua conta existente
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome completo"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Seu nome"
            />
            
            <Input
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
            />
            
            <Input
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Sua senha"
            />

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              Criar conta
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};