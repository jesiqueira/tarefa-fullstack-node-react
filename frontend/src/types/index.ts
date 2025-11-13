// src/types/index.ts

/**
 * ARQUIVO BARRIL (Barrel File)
 * Re-exporta todas as definições de tipos dos arquivos de domínio.
 * Permite que outros módulos usem a importação unificada:
 * import { Tarefa, Usuario, ApiResponse } from '../types';
 */

export * from './task'
export * from './user'
export * from './api'
