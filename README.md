# StackGuard-Sentinel — NHI Security Intelligence Dashboard

StackGuard-Sentinel is a security intelligence dashboard designed to help organizations monitor, analyze, and understand risks associated with **Non-Human Identities (NHIs)** — including API keys, service accounts, tokens, and machine credentials.

In modern cloud environments, NHIs vastly outnumber human identities and act as the backbone of system-to-system communication. However, they are often over-permissioned, poorly monitored, and highly vulnerable — making them a critical attack surface.

StackGuard-Sentinel focuses on transforming this complex and often opaque ecosystem into **clear, actionable security insights**.

---

## Problem Space

Today's enterprises operate with a rapidly growing number of NHIs that:

- **Outnumber** human identities significantly
- **Possess** broad and often excessive access permissions
- **Lack** visibility and ownership
- **Are involved** in a majority of modern security breaches

Despite their importance, organizations struggle to answer:

- Which identities are risky?
- What systems can they access?
- What happens if one is compromised?

---

## Solution Overview

StackGuard-Sentinel provides a unified interface to:

- **Discover and analyze** identity access patterns
- **Visualize risk** through blast radius modeling
- **Understand** how access propagates across systems
- **Identify** high-impact vulnerabilities instantly

The platform bridges the gap between raw security data and human understanding, enabling faster and more informed decision-making.

---

## Core Capabilities

### 🔐 Identity Risk Visibility

Gain a comprehensive view of NHIs, their permissions, and their associated risk levels.

### 📊 Security Posture Dashboard

A structured overview of key metrics, highlighting critical risks, exposure levels, and system-wide insights.

### 📁 VCS & Resource Analysis

Analyze secrets and credentials across repositories and cloud resources with filtering, sorting, and contextual breakdowns.

### 💥 Blast Radius Intelligence (Key Feature)

Model and visualize how a compromised identity can impact systems:

- Map **identity → permissions → resources**
- Highlight attack paths and lateral movement
- Quantify impact through risk scores and severity levels
- Enable quick understanding of "what is at risk and why"

---

## Design Philosophy

StackGuard-Sentinel is built with a **security-first, insight-driven UX** approach:

- **Clarity over complexity** — simplify deeply technical data
- **Actionable insights over raw metrics** — focus on decision-making
- **Progressive disclosure** — surface critical information first
- **Context-aware visualization** — make relationships and risks intuitive

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (strict mode) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (built on Radix UI) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + Tailwind Merge |
| **Charts** | [Recharts 3](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation |
| **Notifications** | [Sonner](https://sonner.emilkowal.dev/) |
| **PDF Export** | [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas-pro](https://github.com/nicolo-ribaudo/html2canvas-pro) |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Animations** | [tw-animate-css](https://github.com/nicholasgasior/tw-animate-css) |
| **Runtime** | [React 19](https://react.dev/) |

---

## Architecture

```
src/
├── app/
│   ├── (protected)/                 # Auth-gated routes
│   │   └── dashboard/
│   │       ├── components/
│   │       │   ├── containers/      # State & business logic
│   │       │   ├── views/           # Presentational components
│   │       │   └── helpers/         # Reusable UI pieces
│   │       ├── lib/                 # Utilities & config
│   │       ├── services/            # Export, API services
│   │       └── types/               # TypeScript interfaces
│   ├── (public)/                    # Unauthenticated routes
│   │   └── login/
│   ├── layout.tsx                   # Root layout
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn/ui primitives
│   ├── sidebar/                     # Navigation sidebar
│   └── providers/                   # Context providers
├── context/                         # Auth context
├── hooks/                           # Shared hooks
└── lib/
    ├── constants/                   # Design tokens
    ├── data/                        # Navigation config
    ├── hooks/                       # Auth hook
    └── types/                       # Shared types
```

**Key patterns:**

- **Container / View / Helper** — Containers own state and logic, Views are purely presentational, Helpers are focused reusable components
- **Route Groups** — `(protected)` routes require authentication; `(public)` routes do not
- **Context-based Auth** — Session-backed authentication with protected layout guards
- **Collapsible Sidebar** — Full navigation with primary, secondary, and user sections

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
git clone https://github.com/deepanshuranaa/StackGuard-Sentinel.git
cd stackguard-sentinel
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). The app uses Turbopack for fast HMR.

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Available Routes

| Route | Description | Auth |
|---|---|---|
| `/login` | Login page | Public |
| `/dashboard` | Security overview dashboard | Protected |
| `/findings/vcs` | VCS secret findings | 
---

## Vision

StackGuard-Sentinel aligns with the broader mission of **securing NHIs as a foundational pillar of modern cybersecurity**.

As organizations scale, the ability to:

- **Identify** every machine identity
- **Understand** its access
- **Quantify** its risk

becomes essential.

> *This product is a step toward a future where every non-human identity is known, trusted, and secure.*
