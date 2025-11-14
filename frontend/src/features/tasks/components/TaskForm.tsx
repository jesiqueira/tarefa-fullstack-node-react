import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { CreateTaskData } from '../types';
import { STATUS_MAP } from '../constants/statusMap';

interface TaskFormProps {
  onSubmit: (data: CreateTaskData) => Promise<void>;
  isLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<CreateTaskData>({
    titulo: '',
    descricao: '',
    status: 'pendente',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ titulo: '', descricao: '', status: 'pendente' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Nova Tarefa</h3>
      
      <Input
        label="Título"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
        required
        placeholder="Título da tarefa"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Descrição da tarefa"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {Object.entries(STATUS_MAP).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full">
        Criar Tarefa
      </Button>
    </form>
  );
};