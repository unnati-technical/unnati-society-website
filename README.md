# Unnati Society — Monorepo

A production-grade **Turborepo + pnpm** monorepo powering all digital products for Unnati Society NGO.

## 🌐 Live Domains
- **Main Website**: [https://unnati.iiitbh.ac.in](https://unnati.iiitbh.ac.in)
- **Donation Portal**: Live and accepting Razorpay payments (Standard & 80G compliant)

## 🏢 Apps

| App | Description | Path |
|-----|-------------|------|
| `@unnati/web` | Public website (React + Vite) | `apps/web` |
| `@unnati/admin` | Admin dashboard | `apps/admin` |
| `@unnati/volunteer-portal` | Volunteer management | `apps/volunteer-portal` |
| `@unnati/student-portal` | Student learning portal | `apps/student-portal` |
| `@unnati/api` | Backend REST API (NestJS) | `apps/api` |
| `@unnati/mobile` | Mobile app (Expo) | `apps/mobile` |

## 📦 Packages

| Package | Description |
|---------|-------------|
| `@unnati/ui` | Shared UI components |
| `@unnati/types` | Shared TypeScript types |
| `@unnati/utils` | Common utility functions |
| `@unnati/hooks` | Shared React hooks |
| `@unnati/config` | Shared ESLint + TSConfig |

## 🚀 Quick Start

```bash
# Install dependencies (use --prod=false in production deployments like Render)
pnpm install

# Run the public website (dev)
pnpm dev:web

# Run all apps simultaneously
pnpm dev

# Build the public website
pnpm build:web

# Run a specific app
pnpm dev --filter=@unnati/admin
```

## 🛠️ Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Frontend**: Vite + React 19 + Tailwind CSS v4 + Framer Motion
- **Backend**: NestJS + Prisma + PostgreSQL + Redis (BullMQ)
- **Integrations**: Razorpay (Payments), Firebase Admin (Auth), Cloudinary (Media), Nodemailer
- **Mobile**: Expo (React Native)
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js >= 18 (Recommended v20+)
- pnpm >= 9
- PostgreSQL (Local or Cloud)
- Redis (For background queues)

## 🔜 Upcoming Features

The following pages and features are currently being built and are hidden from the admin dashboard:
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