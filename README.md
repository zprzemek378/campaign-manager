# Campaign Manager

A full-stack application for managing marketing campaigns built with React, Express, and PostgreSQL.

## Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0
- Docker and Docker Compose

## Project Structure

This monorepo contains the following applications and packages:

### Apps

- `apps/frontend`: React + Vite application for the user interface
- `apps/backend`: Express.js + Prisma backend API

### Packages

- `packages/shared-types`: Shared TypeScript interfaces and types
- `packages/eslint-config`: Shared ESLint configurations
- `packages/typescript-config`: Shared TypeScript configurations

## Getting Started

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/zprzemek378/campaign-manager.git
cd campaign-manager
pnpm install
```

2. Set up environment variables:

For the backend (`apps/backend/.env`):

```bash
cp apps/backend/.env.example apps/backend/.env
```

```properties
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/campaign_db
FRONTEND_URL=localhost:5173
```

For the frontend (`apps/frontend/.env`):

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

```properties
VITE_API_URL=http://localhost:3001/api
```

3. Start the development environment:

```bash
pnpm dev
```

This command will:

- Start PostgreSQL in Docker
- Run Prisma migrations
- Start the backend server
- Start the frontend development server

## Development

### Available Commands

- `pnpm dev` - Start the development environment (database, backend, and frontend)
- `pnpm build` - Build all applications
- `pnpm lint` - Run ESLint across all projects
- `pnpm format` - Format all files with Prettier

### Individual Components

You can also run components individually:

#### Database

```bash
# Start PostgreSQL in Docker
pnpm run start:docker
```

#### Backend

```bash
cd apps/backend
pnpm dev
```

#### Frontend

```bash
cd apps/frontend
pnpm dev
```

## Technologies Used

- **Frontend**: React, Vite, TypeScript, SCSS Modules
- **Backend**: Express.js, Prisma, TypeScript
- **Database**: PostgreSQL (via Docker)
- **Build Tools**: Turborepo, pnpm workspaces
