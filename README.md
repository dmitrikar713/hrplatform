# HR Platform

A monorepo project built with Turborepo, featuring:
- **Backend**: NestJS with Prisma ORM
- **Frontend**: React TypeScript with Flowbite UI

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (install with `npm install -g pnpm`)
- PostgreSQL database (for Prisma)

### Install Dependencies

```bash
pnpm install
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd apps/backend
```

2. Create a `.env` file:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/hrplatform?schema=public"
PORT=3001
FRONTEND_URL=http://localhost:3000
```

3. Generate Prisma Client:
```bash
pnpm prisma:generate
```

4. Run database migrations:
```bash
pnpm prisma:migrate
```

### Development

**Run all apps in development mode (recommended):**

```bash
pnpm dev
```

This will start both frontend and backend simultaneously using Turborepo.

**Run specific app:**

```bash
# Backend only
pnpm --filter backend dev

# Frontend only
pnpm --filter frontend dev
```

**Or using Turborepo directly:**

```bash
# From root directory
pnpm exec turbo run dev --filter=backend
pnpm exec turbo run dev --filter=frontend
```

The apps will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Build

Build all apps:

```bash
pnpm build
```

### Lint

Lint all apps:

```bash
pnpm lint
```

### Prisma Commands

**From the backend directory (using scripts - recommended):**

```bash
cd apps/backend

# Generate Prisma Client
pnpm prisma:generate

# Create and run migrations
pnpm prisma:migrate

# Open Prisma Studio (database GUI)
pnpm prisma:studio
```

**Or from root directory using pnpm filter:**

```bash
# Generate Prisma Client
pnpm --filter backend prisma:generate

# Create and run migrations
pnpm --filter backend prisma:migrate

# Open Prisma Studio
pnpm --filter backend prisma:studio
```

**Or using pnpm exec directly:**

```bash
cd apps/backend
pnpm exec prisma generate
pnpm exec prisma migrate dev
pnpm exec prisma studio
```

## Project Structure

```
.
├── apps
│   ├── backend          # NestJS + Prisma backend
│   │   ├── src/         # Source code
│   │   ├── prisma/      # Prisma schema and migrations
│   │   └── package.json
│   └── frontend         # React TypeScript + Flowbite frontend
│       ├── src/         # Source code
│       └── package.json
├── packages              # Shared packages (if any)
├── package.json          # Root package.json with Turborepo
└── turbo.json           # Turborepo configuration
```

## Tech Stack

### Backend
- **NestJS**: Progressive Node.js framework
- **Prisma**: Next-generation ORM
- **TypeScript**: Type-safe JavaScript

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Flowbite**: Tailwind CSS component library
- **Tailwind CSS**: Utility-first CSS framework

