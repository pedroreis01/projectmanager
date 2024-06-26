# Aplicação de Gerenciamento de Projetos

## Visão Geral

Dysrup Projects é um sistema completo de gerenciamento de tarefas projetado para ajudar as equipes a organizar, rastrear e gerenciar seus projetos e tarefas com eficiência. 
Fornecendo aos usuários uma ferramenta poderosa para aumentar sua produtividade e colaboração.
O projeto utiliza as seguintes tecnologias:

- **Frontend:** Vite, React e TypeScript
- **Backend:** NestJS
- **Banco de Dados:** PostgreSQL

## Funcionalidades

1. **Criar Usuário:** Os usuários podem criar uma conta para acessar o sistema.
2. **Fazer Login:** Os usuários podem fazer login para ter acesso as funcionalidades do sistema.
3. **Gerenciar um Novo Projeto:** Os usuários podem gerenciar um Projeto.
4. **Vincular a um Projeto:** Os usuários podem vincular a um projeto existente.
6. **Gerenciar Tarefas:** Os usuários podem gerenciar tarefas.
6. **Adicionar Tarefas a um Projeto:** Os usuários podem adicionar tarefas a um projeto existente.
7. **Listar Tarefas de um Projeto:** Os usuários podem listar todas as tarefas associadas a um projeto específico.
8. **Marcar uma Tarefa como Concluída:** Os usuários podem marcar uma tarefa específica como concluída.

## Instruções de Configuração

### Pré-requisitos

- Node.js
- PostgreSQL
- Docker (opcional)
- Git

### Configuração do Backend

1. **Clone o Repositório:**

   ```bash
   git clone <link-do-repositorio>
   cd project-management-backend
   ```

2. **Instale as Dependências:**

   ```bash
   yarn install
   ```

3. **Configure as Variáveis de Ambiente:**

   Crie um arquivo `.env` no diretório raiz e adicione o seguinte:

   ```env
   JWT_SECRET=seu_segredo_jwt
   ```

4. **Execute o Banco de Dados com Docker:**

   Se você tiver o Docker instalado, pode usar o `docker-compose` para subir o banco de dados:

   ```bash
   docker-compose up -d
   ```

   O arquivo `docker-compose.yml` deve estar configurado corretamente para subir o serviço do PostgreSQL.

5. **Execute as Migrações:**

   ```bash
   npm run typeorm migration:run
   ```

6. **Inicie o Servidor Backend:**

   ```bash
   yarn start:dev
   ```

### Configuração do Frontend

1. **Navegue até o Diretório do Frontend:**

   ```bash
   cd ../project-management-frontend
   ```

2. **Instale as Dependências:**

   ```bash
   yarn install
   ```

3. **Configure as Variáveis de Ambiente:**

   Crie um arquivo `.env` no diretório raiz e adicione o seguinte:

   ```env
   VITE_URL_BACKEND=http://localhost:3000
   ```

4. **Inicie o Servidor Frontend:**

   ```bash
   yarn dev
   ```

### Estrutura do Banco de Dados

| Table Name      | Column Name        | Data Type                 | Constraints                                                         |
|-----------------|--------------------|---------------------------|---------------------------------------------------------------------|
| user            | id                 | SERIAL                    | PRIMARY KEY                                                        |
|                 | name               | character varying(255)    | NOT NULL                                                           |
|                 | email              | character varying(255)    | NOT NULL, UNIQUE                                                    |
|                 | login              | character varying(100)    | NOT NULL, UNIQUE                                                    |
|                 | password           | text                      | NOT NULL                                                           |
| project         | id                 | SERIAL                    | PRIMARY KEY                                                        |
|                 | name               | character varying(255)    | NOT NULL, UNIQUE                                                    |
|                 | description        | character varying(255)    | NOT NULL                                                           |
|                 | startDate          | date                      | NOT NULL                                                           |
| task            | id                 | SERIAL                    | PRIMARY KEY                                                        |
|                 | name               | character varying(255)    | NOT NULL                                                           |
|                 | description        | character varying(255)    | NOT NULL                                                           |
|                 | dueDate            | date                      | NOT NULL                                                           |
|                 | fkProjectId        | integer                   | NOT NULL, FOREIGN KEY REFERENCES project(id)                        |
|                 | done               | boolean                   | DEFAULT false                                                      |
|                 | finishedDate       | date                      |                                                                    |
| userProject     | id                 | SERIAL                    | PRIMARY KEY                                                        |
|                 | fkUserId           | integer                   | NOT NULL, FOREIGN KEY REFERENCES "user"(id)                         |
|                 | fkProjectId        | integer                   | NOT NULL, FOREIGN KEY REFERENCES project(id)                        |

## Rotas das APIs

## Auth
- **POST** - `auth/signIn`

## Projects
- **GET** - `project`
- **GET** - `project?includeUsers=true`
- **GET** - `project/{id}`
- **GET** - `project/{id}?includeUsers=true`
- **GET** - `project/unlinked-user/{id}`
- **GET** - `project/linked-user/{id}`
- **POST** - `project`
- **POST** - `project/user/{userId}`
- **POST** - `project/{id}/link-users`
- **POST** - `project/{id}/unlink-users`
- **PATCH** - `project/{id}`
- **DELETE** - `project/{id}`

## Tasks
- **GET** - `task`
- **GET** - `task/{id}`
- **GET** - `task/user-project/filter?projectId={projectId}`
- **GET** - `task/project/{projectId}`
- **POST** - `task`
- **PATCH** - `task/{id}`
- **PATCH** - `task/{id}/status`
- **DELETE** - `task/{id}`

## Users
- **GET** - `user`
- **GET** - `user?includeProjects=true`
- **GET** - `user/{id}`
- **GET** - `user/{id}?includeProjects=true`
- **POST** - `user`
- **PATCH** - `user/{id}`
- **DELETE** - `user/{id}`