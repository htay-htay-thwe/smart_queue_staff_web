# Smart Queue  Staff Web Application

> A professional, real-time queue and table management dashboard built for restaurant and shop staff. Designed to eliminate manual queue handling by providing instant visibility into customer flow, seat availability, and business analytics  all from a single, responsive web interface.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Pages & Modules](#pages--modules)
- [Real-Time System](#real-time-system)
- [State Management](#state-management)
- [Authentication Flow](#authentication-flow)
- [Deployment](#deployment)

---

## Overview

**Smart Queue** is a full-stack queue management system. This repository is the **Staff Web Portal**  a Next.js 16 web application used by shop owners and staff to manage customer queues, monitor table occupancy, view analytical reports, and configure their business profile.

The application communicates with a NestJS backend via REST APIs and WebSockets (Socket.IO), enabling real-time updates across all connected clients without manual page refreshes.

---

## Key Features

| Feature | Description |
|---|---|
| **Real-Time Queue Updates** | Instant notifications when a new customer joins the queue or a table is freed, powered by Socket.IO |
| **Live Table Monitor** | Visual overview of all tables showing occupied, free, and pending status |
| **Queue Management** | Assign waiting customers to available tables with a single action |
| **Dining Tracker** | View all currently seated customers with timestamps and table info |
| **Queue History** | Full historical log with time-based filters (Today, Yesterday, Last 7 Days, Last 30 Days) |
| **Analytics Dashboard** | Pie charts, area charts, and ranked lists showing queue volume, peak hours, and top customers |
| **Seat & Table Configuration** | Define and manage table types (2-seat, 4-seat, 6-seat) and their capacities |
| **Global Content Search** | Instant full-page text search with auto-scroll to the first matching result |
| **In-App Notifications** | Persistent notification bell with categorized alerts for queue and seating events |
| **Multi-Step Shop Registration** | Guided 3-step onboarding: phone OTP verification -> business details -> table setup |
| **Account & Settings Management** | Update profile photo, company name, address (with map picker), email, phone, and password |
| **Secure Authentication** | OTP-based verification for phone and email; JWT stored in HTTP-only cookies |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.1.6 | React framework with App Router, SSR, and file-based routing |
| [React](https://react.dev/) | 19 RC | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Latest | Static typing throughout the entire codebase |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Utility-first CSS styling |
| [shadcn/ui](https://ui.shadcn.com/) | v3 | Accessible, composable component library built on Radix UI |

### State & Data

| Technology | Purpose |
|---|---|
| [Zustand](https://zustand-demo.pmnd.rs/) | Lightweight global state (shop data, auth, notifications, search) |
| [TanStack React Query](https://tanstack.com/query) | Server state, caching, and background refetching |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Form handling with schema-based validation |
| [Axios](https://axios-http.com/) | HTTP client for REST API communication |

### Real-Time & Visualisation

| Technology | Purpose |
|---|---|
| [Socket.IO Client](https://socket.io/) | WebSocket connection for live queue and table events |
| [Recharts](https://recharts.org/) | Pie, area, and bar charts for the analytics dashboard |
| [React Leaflet](https://react-leaflet.js.org/) / [Google Maps API](https://developers.google.com/maps) | Interactive map for address selection |
| [Lottie React](https://lottiereact.com/) | Animated loading states |
| [mark.js](https://markjs.io/) | Client-side text highlighting for the global search feature |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notification system |

---

## System Architecture

```
+------------------------------------------------------+
|                 Staff Web App (Next.js)               |
|                                                       |
|   +------------+  +------------+  +---------------+  |
|   | Auth Pages |  | Dashboard  |  | Settings Page |  |
|   +------+-----+  +-----+------+  +------+--------+  |
|          |              |                |            |
|   +------+--------------+----------------+--------+  |
|   |        Global State (Zustand + React Query)    |  |
|   +----------------------+-------------------------+  |
|                          |                            |
|              +-----------+--------------+             |
|              |  REST API (Axios)        |  Socket.IO  |
+--------------+--------------------------+-------------+
               |                          |
               v                          v
      +-----------------+      +---------------------+
      |  NestJS Backend |      |  WebSocket Server   |
      |  (REST API)     |      |  (Socket.IO)        |
      +-----------------+      +---------------------+
```

---

## Project Structure

```
smart_queue_staff_web/
+-- app/
|   +-- auth/                   # Authentication routes
|   |   +-- loginPage/          # Login form & forgot password
|   |   +-- register/           # 3-step shop registration wizard
|   +-- dashboard/              # Protected dashboard routes
|       +-- layout.tsx          # Socket.IO connection + global search setup
|       +-- components/         # Shared dashboard UI components
|       |   +-- NotificationBell.tsx  # In-app notification bell & alert panel
|       +-- dashboard/          # Analytics & live table overview
|       +-- queue/              # Active queue assignment management
|       +-- dining/             # Currently seated (dining) customers
|       +-- history/            # Queue history log with date filters
|       +-- seat-Place/         # Seat & table type configuration
|       |   +-- [id]/           # Dynamic route: seat details per table type
|       +-- report/             # Business reports (in active development)
|       +-- settings/           # Account, shop & address settings
|       +-- sidebar/            # Navigation sidebar & search input
+-- components/ui/              # Reusable shadcn/ui components
+-- services/                   # API service layer (auth, profile, queue)
+-- hooks/                      # Custom React hooks (useQueue, useProfile, etc.)
+-- store/                      # Zustand stores (shop, auth, notifications, search)
+-- types/                      # TypeScript type definitions
+-- lib/                        # Utilities (axios instance, cookie helpers)
+-- public/                     # Static assets
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9+ (or yarn / pnpm)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd smart_queue_staff_web

# 2. Install dependencies
npm install

# 3. Configure environment variables (see section below)
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Backend REST API base URL
NEXT_PUBLIC_API_URL=https://smart-q-backend-nestjs.onrender.com

# Google Maps API key (used in address picker during registration & settings)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server at `localhost:3000` |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint the codebase with ESLint |

---

## Pages & Modules

### Landing

| Route | Description |
|---|---|
| `/` | Root entry point — redirects to the appropriate auth or dashboard route |

### Authentication

| Route | Description |
|---|---|
| `/auth/loginPage` | Staff login with email and password |
| `/auth/loginPage/forgotPassword` | Password recovery flow |
| `/auth/register` | Multi-step registration wizard shell with `StepIndicator` progress bar |
| `/auth/register/stepOne` | **Step 1** — Phone number entry, SMS OTP verification, email field, email OTP verification, and initial password creation |
| `/auth/register/stepTwo` | **Step 2** — Business location selection via interactive map (`MapPicker`) and shop profile image upload |
| `/auth/register/stepThree` | **Step 3** — Shop description, shop type selection, and table type & seating capacity configuration |

### Dashboard

| Route | Description |
|---|---|
| `/dashboard/dashboard` | Main view: queue pie chart, area chart by time, queue records, live table status, and most-active customers |
| `/dashboard/queue` | View the active customer waiting list and assign customers to available tables |
| `/dashboard/dining` | Track all currently seated (dining) customers with table and timestamp info |
| `/dashboard/history` | Full queue history log with date-range filters (Today, Yesterday, Last 7 Days, Last 30 Days) |
| `/dashboard/seat-Place/:id` | Dynamic route — scrollable seat layout and configuration for a specific table type |
| `/dashboard/report` | Business reports *(in active development)* |
| `/dashboard/settings` | Manage profile photo, account info, company name, address (map picker), email, phone, and password |

---

## Real-Time System

The dashboard `layout.tsx` establishes a **persistent Socket.IO connection** for the duration of the session, subscribing to two server-emitted events:

| Event | Trigger | Side Effects |
|---|---|---|
| `freeTable` | A customer leaves and a table becomes free | Shows "seat" notification  Invalidates `queue` and `occupyTable` query caches |
| `newCustomerQueue` | A new customer joins the waiting queue | Shows "queue" notification  Invalidates `queue` and `occupyTable` query caches |

React Query's `invalidateQueries` automatically re-fetches stale data, keeping all dashboard widgets in sync without any manual page refreshes.

---

## State Management

The application uses **Zustand** for global client state, split into four focused stores:

| Store | File | Purpose |
|---|---|---|
| `useShopStore` | `store/shopStore.ts` | Persisted shop/business data loaded after login |
| `useRegisterStore` | `store/authStore.ts` | Temporary multi-step registration state |
| `useNotiStore` | `store/notiStore.ts` | In-app notification list (queue and seat alerts) |
| `useSearchStore` | `store/searchStore.ts` | Global search query shared between search bar and mark.js |

Server state (API responses, loading/error states, caching) is handled entirely by **TanStack React Query**.

---

## Authentication Flow

```
1. Enter phone number
         |
         v
2. Receive & verify SMS OTP
         |
         v
3. Enter email -> Receive & verify Email OTP
         |
         v
4. Fill business details (name, description, shop type, cover image)
         |
         v
5. Set business location via interactive map
         |
         v
6. Configure table types & seating capacities
         |
         v
7. Account created -> Redirect to Login -> JWT stored in cookie
```

---

## Deployment

This project is optimised for deployment on [Vercel](https://vercel.com/):

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

For a self-hosted Node.js server:

```bash
npm run build
npm run start
```

Ensure all environment variables are configured on your deployment platform before running.

---

## License

This project is proprietary software developed for the Smart Queue system.  
All rights reserved (c) 2026 Smart Queue, Inc.
