# Architecture Overview

This monorepo uses **Turborepo** with **pnpm workspaces** for managing all Unnati Society digital products.

## Data Flow

```
Browser → apps/web (Public Site)
Browser → apps/admin (Admin Dashboard)
Browser → apps/volunteer-portal (Volunteers)
Browser → apps/student-portal (Students)
        ↓
    apps/api (REST API — Express)
        ↓
    Firebase Firestore
```

## Shared Code Strategy

- `@unnati/ui` — Reusable React components. Import in any app.
- `@unnati/types` — TypeScript interfaces. Shared between frontend and api.
- `@unnati/utils` — Pure functions. Safe for both browser and Node.js.
- `@unnati/hooks` — React hooks. Only usable in React apps.
- `@unnati/config` — Tooling config. Extended by each app's ESLint/tsconfig.
