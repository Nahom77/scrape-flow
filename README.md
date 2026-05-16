# Scrape Flow

Scrape Flow is a Next.js-based web application for building, scheduling, and executing web-scraping workflows. It uses Prisma with PostgreSQL for persistence and includes a modular `actions/` and `workflows/` backend for defining and running scraping tasks.

## Features

- Next.js 16 app with server and client components
- Workflow authoring and scheduling (cron support)
- Execution history and phase details
- PostgreSQL via Prisma for reliable persistence
- Puppeteer integration for headless browsing

## Repository Structure (high level)

- `app/` — Next.js app routes and UI
- `actions/` — backend actions (billing, workflows, executors)
- `components/` — shared React components and UI primitives
- `lib/` — utilities, auth and Prisma client
- `prisma/` — Prisma schema and migrations
- `schema/` — Zod schemas for API validation
- `package.json` — project scripts and dependencies

Key files:

- [package.json](package.json)
- [env.example](env.example)
- [prisma/schema.prisma](prisma/schema.prisma)

## Prerequisites

- Node.js 18+ (or the version compatible with Next.js 16)
- PostgreSQL database
- Recommended: a Chromium-compatible environment for Puppeteer

## Quickstart (development)

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp env.example .env
# Then edit .env to set DATABASE_URL and any other secrets
```

3. Prepare the database (Prisma):

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Run the dev server:

```bash
npm run dev
# Open http://localhost:3000
```

## Build & Production

```bash
npm run build
npm run start
```

Ensure your production `DATABASE_URL` and other env variables are set.

## Environment Variables

See `env.example` for the variables this project expects. Most importantly:

- `DATABASE_URL` — PostgreSQL connection string
- Any auth/provider secrets used by `lib/auth` or third-party services

## Database & Prisma notes

- The project uses Prisma. If you change `prisma/schema.prisma`, run:

```bash
npx prisma generate
npx prisma migrate dev --name your_change_name
```

## Development notes

- UI: `app/` and `components/` contain the Next.js layouts and React components.
- Backend/workflow logic: see `actions/workflows/` for workflow management, publishing, and execution endpoints.
- Prisma client is exported from `lib/prisma.ts`.

## Running Headless Scrapes

- This project includes `puppeteer` for headless browser scraping. On some platforms (like linux containers) you may need additional packages or to use the `puppeteer-core` + system Chrome.

## Testing, Linting & Formatting

- Lint: `npm run lint`
- TypeScript is included; run your own checks via `tsc` if desired.

## Contributing

Contributions are welcome. Please open issues or pull requests with focused changes. If adding features, include tests and update this README with any new environment variables or setup steps.
