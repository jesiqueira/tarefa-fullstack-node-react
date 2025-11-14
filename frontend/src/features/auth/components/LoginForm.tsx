import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        Entrar
      </Button>
    </form>
  );
};