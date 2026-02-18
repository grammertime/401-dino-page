# Dino Discovery Camp Roster

A full-stack web application for managing the Dino Discovery Camp summer roster. View enrolled campers and edit their usernames and emojis. Data is persisted in PostgreSQL.

## What It Does

- **View campers** — Displays all enrolled campers with name, username, and emoji
- **Edit usernames** — Save username and emoji changes that persist in the database
- **REST API** — Backend exposes `GET /api/users` and `PATCH /api/users/:id` for roster data

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query
- **Backend:** Node.js, Express
- **Database:** PostgreSQL

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL

## How to Run

### 1. Clone and install

```sh
git clone <YOUR_REPO_URL>
cd dino-camp-roster-frontend-only
npm install
```

### 2. Set up the database

Create a PostgreSQL database named `dinocamp`, then run:

```sh
psql -d dinocamp -f db/schema.sql
psql -d dinocamp -f db/seed.sql
```

If you have an existing `users` table without `username`/`emoji` columns, run `db/migrate-add-username-emoji.sql` first, then re-seed as needed.

### 3. Configure environment

Copy `.env.example` to `.env` and update values:

```sh
cp .env.example .env
```

Edit `.env`:

- `DATABASE_URL` — PostgreSQL connection string (e.g. `postgresql://USER:PASSWORD@localhost:5432/dinocamp`)
- `VITE_API_URL` — API base URL for the frontend (default `http://localhost:3000`)

### 4. Start the backend

```sh
cd backend
npm install
node server.js
```

The API runs at `http://localhost:3000`.

### 5. Start the frontend

In a new terminal:

```sh
cd frontend
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Quick reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run dev:backend` | Start backend API |
| `npm run build` | Build frontend for production |

## Project Structure

```
├── frontend/       # React + Vite app
├── backend/        # Express API
├── db/             # schema, seed, migrations
└── .env            # Environment config (create from .env.example)
```
