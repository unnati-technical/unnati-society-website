# Unnati Society — Monorepo

A production-grade **Turborepo + pnpm** monorepo powering all digital products for Unnati Society NGO.

## Apps

| App | Description | Path |
|-----|-------------|------|
| `@unnati/web` | Public website | `apps/web` |
| `@unnati/admin` | Admin dashboard | `apps/admin` |
| `@unnati/volunteer-portal` | Volunteer management | `apps/volunteer-portal` |
| `@unnati/student-portal` | Student learning portal | `apps/student-portal` |
| `@unnati/api` | Backend REST API | `apps/api` |
| `@unnati/mobile` | Mobile app (Expo) | `apps/mobile` |

## Packages

| Package | Description |
|---------|-------------|
| `@unnati/ui` | Shared UI components |
| `@unnati/types` | Shared TypeScript types |
| `@unnati/utils` | Common utility functions |
| `@unnati/hooks` | Shared React hooks |
| `@unnati/config` | Shared ESLint + TSConfig |

## Quick Start

```bash
# Install dependencies
pnpm install

# Run the public website (dev)
pnpm dev:web

# Run all apps
pnpm dev

# Build the public website
pnpm build:web

# Run a specific app
pnpm dev --filter=@unnati/admin
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Frontend**: Vite + React 19 + Tailwind CSS v4
- **Backend**: Node.js + Express + Firebase Admin
- **Mobile**: Expo (React Native)
- **CI/CD**: GitHub Actions

## Prerequisites

- Node.js >= 18
- pnpm >= 9

## Upcoming Features (Hidden for now)

The following pages and features are currently hidden from the admin dashboard and will be built/integrated later:
- Dashboard (Overview)
- Students
- Initiatives
- Sessions
- Task and assignment
- Attendance
- Resources
- Feedback
- Report and analytics
- Impact dashboard
- Data visualization
- Export center
- Help center / Export ticket
- System settings
ok