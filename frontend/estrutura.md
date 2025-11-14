### Estrutura sugerida (MVC + SRP):

```text
src/
  models/          # Tipos e interfaces (equivalente ao seu "types")
  services/        # API (Axios) e lógica de integração
  controllers/     # Hooks (equivalente ao seu "hooks")
  views/
    components/    # Componentes reutilizáveis
    pages ou layuts/         # Páginas principais
```

✅ Como separar responsabilidades (MVC adaptado para React)
Vou propor uma divisão clara:

1. Model

- Tipos e interfaces (Task, User)
- Estrutura de dados e regras básicas (já está em types)

2. Service

- Toda lógica de integração com Firebase:

Inicialização do Firebase
Funções CRUD (addTask, updateTaskStatus, deleteTask)
Funções de autenticação (signIn, signOut, etc.)

Criar um arquivo firebaseService.ts dentro de services/

3. Controller

Hooks que conectam a View ao Service:

useAuth → gerencia estado do usuário e login/logout
useTasks → gerencia lista de tarefas e operações CRUD

Esses hooks chamam os serviços e expõem dados para os componentes

4. View

Componentes e páginas:

App.tsx deve apenas renderizar UI e usar os hooks
Formulário de nova tarefa → componente separado (NewTaskForm.tsx)
Lista de tarefas → componente separado (TaskList.tsx)

```text
src/
  models/                # Tipos e interfaces (já temos)
    task.ts
    user.ts
    auth.ts
    api.ts
    index.ts
  services/
    firebaseService.ts   # Firebase CRUD + Auth
    api.ts               # Axios para backend PostgreSQL
  controllers/
    useAuth.ts           # Hook para autenticação
    useTasks.ts          # Hook para tarefas
  views/
    components/
      NewTaskForm.tsx
      TaskItem.tsx
    pages/
      AuthScreen.tsx
      TaskManager.tsx
      App.tsx
  utils/
    constants.ts         # STATUS_MAP e outros

```

```text
src/
  services/apiService.ts
  controllers/useAuth.ts, useTasks.ts
  views/pages/AuthScreen.tsx, TaskManager.tsx
  views/components/NewTaskForm.tsx, TaskItem.tsx
  models/task.ts, user.ts
```

```text
src/
  models/
    api.ts        # Tipos para respostas da API
    user.ts       # Tipos para usuário
    task.ts       # Tipos para tarefa
  services/
    axiosInstance.ts  # Configuração do Axios
    userService.ts    # Métodos relacionados a usuário
    taskService.ts    # Métodos relacionados a tarefas

```
```text
taskflow-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── UserProfile.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── api/
│   │   │       └── authAPI.ts
│   │   └── tasks/
│   │       ├── components/
│   │       │   ├── TaskForm.tsx
│   │       │   ├── TaskItem.tsx
│   │       │   ├── TaskList.tsx
│   │       │   └── TaskManager.tsx
│   │       ├── hooks/
│   │       │   └── useTasks.ts
│   │       ├── services/
│   │       │   └── taskService.ts
│   │       ├── types/
│   │       │   └── index.ts
│   │       ├── api/
│   │       │   └── tasksAPI.ts
│   │       └── constants/
│   │           └── statusMap.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   └── index.ts
│   │   │   ├── LoadingSpinner/
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── PageContainer.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── TasksPage.tsx
│   ├── lib/
│   │   ├── axios.ts
│   │   ├── queryClient.ts
│   │   └── constants.ts
│   ├── stores/
│   │   └── authStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   └── formatters.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── .env
```

```text
taskflow-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── features/           # Funcionalidades
│   ├── components/         # Componentes UI
│   ├── pages/             # Páginas/Rotas
│   ├── lib/               # Configurações
│   ├── stores/            # Estado global
│   ├── types/             # Tipos TypeScript
│   ├── utils/             # Utilitários
│   ├── __tests__/         # Testes
│   ├── App.tsx            # ✅ NOVO
│   ├── main.tsx           # ✅ NOVO
│   └── index.css          # ✅ NOVO
├── index.html             # ✅ NOVO
├── package.json
├── vite.config.ts         # ✅ NOVO
├── tailwind.config.js     # ✅ NOVO
├── tsconfig.json
├── tsconfig.node.json
└── .env
```
