# E-Course Builder - Ekosistem Kompetensi SMAP & PANCEK

## Overview

E-Course Builder is a competency-based learning management platform designed for Indonesian organizations. It enables the creation and management of e-courses tied to competency frameworks (SMAP - Strategic Management & Analytical Planning, and PANCEK - Planning, Action, Negotiation, Communication, Execution). The platform tracks participant progress, manages evidence-based assessments, and generates competency passports for talent development decisions.

Key features:
- Competency cluster and unit management (SMAP & PANCEK frameworks)
- E-Course builder with lesson types (orientation, context, microlearning, practice, assessment, reflection)
- Participant tracking with competency level progression (L1-L4)
- Evidence-based assessment system
- Competency passport generation
- Dashboard with heatmap analytics

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query for server state, React useState for local state
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Framework**: Express 5 (ESM modules)
- **Language**: TypeScript with tsx for development
- **API Design**: RESTful JSON API with `/api` prefix
- **Server**: Node.js with HTTP server (supports WebSocket upgrade path)

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Current Storage**: In-memory storage with sample data (PostgreSQL-ready schema)

### Project Structure
```
├── client/src/          # React frontend application
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route page components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and query client
├── server/              # Express backend
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API route definitions
│   └── storage.ts       # Data access layer
├── shared/              # Shared types and schemas
│   └── schema.ts        # Drizzle schema definitions
└── migrations/          # Database migrations (Drizzle Kit)
```

### Key Design Patterns
- **Monorepo structure**: Client, server, and shared code in single repository
- **Type sharing**: Schema types exported from `shared/schema.ts` used by both frontend and backend
- **Component composition**: Shadcn/ui components with Radix primitives
- **API abstraction**: `apiRequest` helper and TanStack Query for data fetching

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations with `npm run db:push`

### UI Framework
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Frontend build and dev server with HMR
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Production bundling for server code

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Runtime error overlay
- **@replit/vite-plugin-cartographer**: Development tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development banner (dev only)

### Session Management (Available)
- **connect-pg-simple**: PostgreSQL session store (available but not yet implemented)
- **express-session**: Session middleware (available in dependencies)