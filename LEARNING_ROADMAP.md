# 📚 Learning Roadmap — Recreating base93 (Playground)

> **Goal:** Rebuild base93 from a base level to learn every tool, library, and pattern used in the real project.
> **Method:** I write all the code myself. Claude guides as a mentor (see [CLAUDE.md](CLAUDE.md)).
> _This is a living document — we'll modify it as we go._

---

## 🔍 What base93 Is (Analysis)

### Frontend
A modern React 19 SPA built with Vite + TypeScript.
- **Styling:** Tailwind CSS v4 + HeroUI component library
- **State:** Redux Toolkit (auth, modals) + React Query (server data)
- **Routing:** React Router 7
- **Forms:** React Hook Form + Yup
- **Architecture:** organized by domain/role (`admin`, `agent`, `operator`, `auth`, `public`)

### Backend (Node.js Microservices)
- **API_GATEWAY** — Express gateway: auth, JWT verification, rate limiting, Redis caching, request proxying, WebSocket proxy, OpenAPI spec.
- **USER service** — Express + MongoDB (Mongoose), layered as `controllers → services → models`, plus `routes`, `middlewares`, `schemas`, `jobs`, `channels`. Uses Redis, RabbitMQ, JWT/Passport, SendGrid + MJML email, Pusher real-time, PDF/Excel generation, and LangChain + Gemini AI.

---

## 🏛️ Architecture We Follow

We replicate base93's exact architecture on both ends. The mental model is the same on both sides: **separate "what it is" from "what you do with it," and group by role/feature.**

### Backend — Layered / Clean Architecture (per microservice)

A request flows DOWN through strict layers:

```
HTTP Request
   ↓
routes/v1/<role>/<entity>.js   → defines endpoints, wires middleware
   ↓
middlewares/                    → cross-cutting concerns (run before controller)
   • auth_handler / check_access → authN & authZ
   • body_handler / query_handler→ validation (Yup schemas)
   • async_handler               → wraps async controllers
   • error_handler / res_handler → standardized responses & errors
   ↓
controllers/<role>/<entity>.js  → THIN: read req, call use-case, return res (no logic)
   ↓
models/use-cases/<entity>.js    → BUSINESS LOGIC (the real work, DB operations)
   ↓
models/entities/<entity>.js     → Mongoose schemas (the DB models)
```

**Clean Architecture naming (deliberate):**
- `entities/` = data models (Mongoose schemas) — _what things are_
- `use-cases/` = operations / business logic — _what you do with them_
- `controllers/` = thin glue between HTTP and use-cases — **no business logic here**

> In real base93: 66 entities, 72 use-cases, 47 controllers — more use-cases than controllers, because logic lives in use-cases and controllers just orchestrate.

**Everything is split by role** (`admin / agent / operator / auth / public`) at the routes & controllers level.

**Above the services:** the **API Gateway pattern** — a single Express gateway handles auth, rate-limiting, Redis caching, and proxies requests to the right microservice.

### Frontend — Domain-Driven / Feature-Sliced

```
src/
├── domains/<role>/<feature>/      ← self-contained feature module
│   ├── api/        → API calls only (axiosInstance, no logic)
│   ├── components/ → feature UI (modals, forms, tables)
│   ├── pages/      → route-level pages (+ co-located columns.tsx)
│   ├── schema/     → Yup validation
│   ├── types/      → types scoped to this feature
│   ├── hooks/      → feature-specific hooks
│   └── constants/  → feature-scoped constants
│
├── components/{atomic,molecular}/ ← SHARED UI (used by 2+ domains)
├── hooks/                         ← shared hooks
├── services/                      ← axiosInstance, auth helpers
├── routes/                        ← route definitions & paths
└── types/                         ← shared types
```

**Core rule:** a feature owns everything it needs in one folder. Something becomes "shared" (moves up to `src/components`, `src/hooks`, `src/types`) only when **2+ domains** use it.

### Both Sides Mirror Each Other

| Concept       | Frontend                  | Backend                              |
| ------------- | ------------------------- | ------------------------------------ |
| Organize by   | role → feature            | role → entity                        |
| Separation    | api / ui / schema / types | routes / controllers / use-cases / entities |
| Thin layer    | components (no logic)     | controllers (no logic)               |
| Logic lives in| hooks + api               | use-cases                            |
| Validation    | Yup schemas               | Yup schemas (`body_handler`)         |

---

## 🎯 Learning Tiers (Prioritized)

### ✅ Tier 1 — Foundations (start here)
- [~] **TypeScript** — types, interfaces, generics · `typescript` _(learning as we go; note: playground uses TS 6.0)_
- [x] **Vite + project setup** — scaffolded React+TS, path aliases (`@/` → `src/`) via `vite-tsconfig-paths` ✓
- [x] **Tailwind v4 + HeroUI** — Tailwind v4 (`@tailwindcss/vite`) + HeroUI **v3** (`@heroui/react` + `@heroui/styles`, no provider/hero.ts needed) ✓
- [ ] **Routing by role/domain** — app architecture · `react-router`

### ⬜ Tier 2 — Core App Patterns
- [ ] **Forms** (the "form builder") · `react-hook-form`, `yup`, `@hookform/resolvers`
- [ ] **Data fetching** — queries, mutations, caching · `@tanstack/react-query`, `axios`
- [ ] **Client state** — auth, modals · `@reduxjs/toolkit`, `react-redux`
- [ ] **Tables** — paginated/sortable grids · `@tanstack/react-table`

### ⬜ Tier 3 — Rich Features (pick what excites you)
- [ ] **Drag & drop** · `@dnd-kit`
- [ ] **Rich text editor** · `@tiptap`
- [ ] **Charts & maps** · `recharts`, `react-simple-maps`
- [ ] **File handling** · `react-dropzone`, `exceljs`/`xlsx`, `@react-pdf/renderer`
- [ ] **Real-time** · `pusher-js`
- [ ] **Page/Form builder** · `grapesjs`

### ⬜ Tier 4 — Backend
- [ ] **Express REST API** · `express`
- [ ] **MongoDB modeling** · `mongoose`
- [ ] **Auth** — JWT, sessions, password hashing · `jsonwebtoken`, `passport-jwt`, `bcrypt`
- [ ] **Layered architecture** — controllers → services → models (pattern)
- [ ] **Caching & queues** · `ioredis`, `amqplib` (RabbitMQ)
- [ ] **API Gateway pattern** — microservices routing
- [ ] **Email, PDF, real-time** · `mjml`, `pdfkit`, `pusher`

---

## 🧭 Mentor's Guidance
- **Tier 1 + Tier 2 = ~80% of the real skill.** Master these before chasing every library.
- Once Tiers 1–2 are solid, Tiers 3–4 become "just another library to slot in."
- Suggested starting point: **Vite + TS + Tailwind + HeroUI setup** — nothing else can be built without it.

---

## 📈 Progress Log
_(We'll note what was learned, when, and any key takeaways here.)_

| Date | Topic | Notes |
| ---- | ----- | ----- |
| 2026-06-28 | Roadmap created | Analyzed base93 frontend + backend, defined tiers |
| 2026-07-15 | Frontend scaffold | Vite + React 19 + TS 6, cleaned boilerplate, boot chain understood |
| 2026-07-15 | Path aliases | `@/` → `src/` via `vite-tsconfig-paths`; learned baseUrl deprecated in TS 6, dev vs prod deps |
| 2026-07-15 | Tailwind v4 | `@tailwindcss/vite` plugin + `@import 'tailwindcss'`; verified with utility class |
| 2026-07-15 | HeroUI v3 | `@import '@heroui/styles'` (after tailwind); no provider/hero.ts in v3; verified with `<Button>` |
