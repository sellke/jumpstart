# Database Setup Guide

This project uses PostgreSQL with Prisma ORM. Follow these steps to set up your local development database.

## Prerequisites

- Docker and Docker Compose installed
- Node.js and npm/pnpm installed

## Quick Start

1. **Create environment file**

   ```bash
   cp .env.example .env
   ```

   Or create `.env` file manually with:

   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5433/nextapp?schema=public"
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start PostgreSQL database**

   ```bash
   pnpm run db:up
   ```

4. **Generate Prisma client and run migrations**

   ```bash
   pnpm run db:generate
   pnpm run db:migrate
   ```

5. **Seed the database (optional)**
   ```bash
   pnpm run db:seed
   ```

## Available Scripts

| Script                 | Description                       |
| ---------------------- | --------------------------------- |
| `pnpm run db:up`       | Start PostgreSQL container        |
| `pnpm run db:down`     | Stop all containers               |
| `pnpm run db:reset`    | Reset database (removes all data) |
| `pnpm run db:migrate`  | Run database migrations           |
| `pnpm run db:generate` | Generate Prisma client            |
| `pnpm run db:studio`   | Open Prisma Studio (database GUI) |
| `pnpm run db:seed`     | Seed database with initial data   |
| `pnpm run db:push`     | Push schema changes to database   |

## Database Access

- **PostgreSQL**: `localhost:5433`
- **Username**: `postgres`
- **Password**: `postgres`
- **Database**: `nextapp`
- **Prisma Studio**: Run `pnpm run db:studio` to open at `http://localhost:5555`

## Usage in Code

```typescript
import { prisma } from '@/lib/prisma';

// Example: Get all users
const users = await prisma.user.findMany();

// Example: Create a new post
const post = await prisma.post.create({
  data: {
    title: 'New Post',
    content: 'Post content',
    authorId: 'user-id',
  },
});
```

## Schema Changes

1. Edit `prisma/schema.prisma`
2. Run `pnpm run db:migrate` to create migration
3. Run `pnpm run db:generate` to update Prisma client

## Troubleshooting

- **Port 5433 already in use**: Stop existing PostgreSQL service or change port in `docker-compose.yml`
- **Connection errors**: Ensure Docker container is running with `npm run db:up`
- **Migration errors**: Try `npm run db:reset` to start fresh
