# Fullstack Assignment — NestJS + Next.js

A secure full-stack CRUD web application built as a technical assignment.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend | NestJS (REST API) |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT (JSON Web Token) |

## Project Structure
```
fullstack-assignment/
├── backend/       # NestJS REST API (port 3001)
│   ├── prisma/    # schema.prisma, migrations
│   └── src/
│       ├── auth/          # Register, Login, JWT Strategy
│       ├── records/       # Product CRUD
│       ├── common/guards/ # JwtAuthGuard
│       └── prisma/        # PrismaService (global)
└── frontend/      # Next.js App (port 3000)
    └── src/
        ├── app/(auth)/login/
        ├── app/(auth)/register/
        ├── app/dashboard/
        ├── components/    # Navbar, ProductTable, ProductForm
        └── lib/api.ts     # Axios instance with JWT interceptor
```

## Getting Started

### Prerequisites
- Node.js ≥ 18
- PostgreSQL running locally

### Backend Setup
```bash
cd backend
cp .env .env.local   # already pre-filled
# Edit DATABASE_URL in .env with your Postgres credentials
npm run build           # TypeScript compile check
npx prisma migrate dev --name init
npm run start:dev       # http://localhost:3001
```

### Frontend Setup
```bash
cd frontend
# .env.local already points to http://localhost:3001
npm run dev             # http://localhost:3000
```

## API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | ❌ | Register user |
| POST | `/auth/login` | ❌ | Login → returns JWT |
| GET | `/records` | ✅ | List all products |
| POST | `/records` | ✅ | Create product |
| GET | `/records/:id` | ✅ | Get product |
| PUT | `/records/:id` | ✅ | Update product |
| DELETE | `/records/:id` | ✅ | Delete product |

## Product Schema
| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID | Auto-generated |
| `name` | String | Required |
| `description` | String | Required |
| `price` | Decimal(10,2) | Min 0 |
| `createdAt` | DateTime | Auto-generated |
