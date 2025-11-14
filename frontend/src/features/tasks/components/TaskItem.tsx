import React from 'react';
import type { Task, StatusTarefa } from '../types';
import { STATUS_MAP } from '../constants';

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (taskId: number, status: StatusTarefa) => void;
  onDelete: (taskId: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateStatus, onDelete }) => {
  const statusInfo = STATUS_MAP[task.status];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 mb-4">
      {/* Layout Mobile: Coluna, Desktop: Linha */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        
        {/* Conteúdo Principal */}
        <div className="flex-1 min-w-0">
          {/* Header Mobile */}
          <div className="flex items-start justify-between mb-2 lg:hidden">
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color} text-white`}>
              {statusInfo.icon} {statusInfo.label}
            </div>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-600 transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          {/* Título e Descrição */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {task.titulo}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {task.descricao}
          </p>

          {/* Metadados */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(task.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <span className="hidden sm:inline-flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              ID: {task.id}
            </span>
          </div>
        </div>

        {/* Controles - Desktop */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 lg:w-48">
          
          {/* Status Selector */}
          <select
            value={task.status}
            onChange={(e) => onUpdateStatus(task.id, e.target.value as StatusTarefa)}
            className={`w-full sm:w-auto lg:w-full px-3 py-2 text-sm font-medium rounded-md text-white ${statusInfo.color} border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {Object.entries(STATUS_MAP).map(([key, data]) => (
              <option key={key} value={key} className="bg-white text-gray-900">
                {data.label}
              </option>
            ))}
          </select>

          {/* Botões de Ação - Desktop */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDelete(task.id)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-1 sm:mr-0 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="sm:sr-only lg:not-sr-only">Excluir</span>
            </button>
            
            <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              <svg className="w-4 h-4 mr-1 sm:mr-0 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="sm:sr-only lg:not-sr-only">Editar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};