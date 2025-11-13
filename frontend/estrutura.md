### Estrutura sugerida (MVC + SRP):

```text
src/
  models/          # Tipos e interfaces (equivalente ao seu "types")
  services/        # API (Axios) e lógica de integração
  controllers/     # Hooks (equivalente ao seu "hooks")
  views/
    components/    # Componentes reutilizáveis
    pages/         # Páginas principais
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
