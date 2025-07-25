# Mantine Next.js template

This is a template for [Next.js](https://nextjs.org/) app router + [Mantine](https://mantine.dev/).
If you want to use pages router instead, see [next-pages-template](https://github.com/mantinedev/next-pages-template).

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)
- [Prisma](https://www.prisma.io/) ORM with PostgreSQL
- [Docker](https://www.docker.com/) setup for local development

## Quick Start

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Or create `.env` file with:

   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5433/nextapp?schema=public"
   ```

3. **Start the database**

   ```bash
   pnpm run db:up
   ```

4. **Set up Prisma**

   ```bash
   pnpm run db:generate
   pnpm run db:migrate
   ```

5. **Seed the database (optional)**

   ```bash
   pnpm run db:seed
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

## pnpm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `start` – start production server
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Database scripts

- `db:up` – start PostgreSQL container
- `db:down` – stop all Docker containers
- `db:reset` – reset database (removes all data and restarts container)
- `db:migrate` – run database migrations
- `db:generate` – generate Prisma client
- `db:studio` – open Prisma Studio (database GUI at http://localhost:5555)
- `db:seed` – seed database with initial data
- `db:push` – push schema changes to database (development only)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint and Stylelint
- `eslint` – runs ESLint only
- `stylelint` – runs Stylelint only
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

## Database Setup

This project uses PostgreSQL with Prisma ORM. The database runs in a Docker container for easy development.

### Database Models

The project includes the following Prisma models:

- **User**: User accounts with email, name, and timestamps
- **Post**: Blog posts with title, content, author relationship, and publish status

### Database Access

- **PostgreSQL**: `localhost:5433`
- **Username**: `postgres`
- **Password**: `postgres`
- **Database**: `nextapp`
- **Prisma Studio**: Available at `http://localhost:5555` after running `pnpm run db:studio`

### Using Prisma in Your Code

```typescript
import { prisma } from '@/lib/prisma';

// Get all users
const users = await prisma.user.findMany();

// Create a new user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
  },
});

// Get user with posts
const userWithPosts = await prisma.user.findUnique({
  where: { id: 'user-id' },
  include: { posts: true },
});

// Create a new post
const post = await prisma.post.create({
  data: {
    title: 'New Post',
    content: 'Post content here...',
    authorId: 'user-id',
    published: true,
  },
});
```

### Schema Changes

When you modify the Prisma schema:

1. Edit `prisma/schema.prisma`
2. Create and apply migration: `pnpm run db:migrate`
3. Generate updated client: `pnpm run db:generate`

For development-only changes, you can use: `pnpm run db:push`

## Docker Commands

The project uses Docker Compose to manage the PostgreSQL database:

```bash
# Start database (detached mode)
pnpm run db:up

# View logs
docker-compose logs postgres

# Stop containers
pnpm run db:down

# Reset database (removes all data)
pnpm run db:reset

# Connect to database directly
docker exec -it next-app-postgres psql -U postgres -d nextapp
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── users/             # User pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── lib/                   # Utility libraries
│   └── prisma.ts          # Prisma client instance
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # Database migrations
│   └── seed.ts           # Database seed file
├── docker/               # Docker configuration
└── docs/                 # Documentation
```

## Troubleshooting

- **Port 5433 already in use**: Stop existing PostgreSQL service or change port in `docker-compose.yml`
- **Connection errors**: Ensure Docker container is running with `pnpm run db:up`
- **Migration errors**: Try `pnpm run db:reset` to start fresh
- **Prisma Client errors**: Run `pnpm run db:generate` to regenerate the client

For detailed database setup instructions, see [docs/DATABASE_SETUP.md](docs/DATABASE_SETUP.md).
