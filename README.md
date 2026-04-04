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

## Blast Radius Visualization — Design Rationale

The Blast Radius feature is the analytical core of StackGuard-Sentinel. Its purpose is to answer a deceptively simple question: **"If this identity is compromised, what is the extent of damage?"**

Answering this requires modeling a chain of relationships:

```
Identity → Service → Permissions → Scopes → Further Access → Impact
```

This is fundamentally a **graph problem**, not a tabular one. Below is the reasoning behind the chosen visualization approach.

### Why Not Tables or Metric Cards?

The raw data from an NHI scan is dense — a single SendGrid Full Access Key, for example, yields 42 scopes, 206 raw permissions, and multiple access levels. Presenting this as a flat table or a list of numbers creates several problems:

- **Cognitive overload** — Users are confronted with rows of permission strings and access levels with no sense of hierarchy, relationship, or relative severity.
- **Loss of structure** — A table treats every row equally. It cannot convey that `Mail Send (Write)` and `Stats (Read)` belong to the same service but carry fundamentally different risk profiles.
- **No propagation visibility** — Blast radius is inherently about how access flows from an identity through a service to its scopes. Tables flatten this chain, making it impossible to trace how a compromised key reaches a sensitive endpoint.

### Why an Interactive Node Graph?

Blast radius maps naturally to a directed acyclic graph (DAG):

- **Identity nodes** represent the compromised credential (e.g., "SendGrid API Key", "OpenAI Service Account API Key")
- **Service nodes** represent the service that credential unlocks, annotated with key type, scope count, and security flags (2FA, restricted access)
- **Scope nodes** represent what the attacker can actually do — grouped by category, color-coded by access level (Read / Write / Read & Write / Admin)
- **Edges** encode the access relationship, with color and animation signaling risk severity

This structure enables users to **visually trace** the path from a leaked key to every resource it can reach, without requiring them to parse raw permission data.

### Independent Subgraphs per Identity

A critical design decision: each identity is rendered as its own **independent subgraph** within a shared canvas. There is no shared root node. This is because:

- Each credential is a separate, independently compromised entity
- Permissions granted by one key have no relationship to another unless explicitly defined
- A shared root (e.g., "Compromised API Key → SendGrid + Postman + OpenAI") would incorrectly imply shared access or a single point of compromise

The subgraphs are laid out horizontally, visually separated, each with its own risk score and severity — making it immediately clear that these are **distinct blast radii**.

### Visual Encoding

The graph uses deliberate visual cues to convey risk without requiring the user to read every label:

| Element | Encoding | Meaning |
|---------|----------|---------|
| **Edge color** | Red / Orange / Yellow | Write or Admin / Read & Write / Read-only |
| **Edge animation** | Dashed + animated | Non-read access = active risk path |
| **Identity ring** | Severity-colored ring | Overall risk severity of that identity |
| **Scope dot** | Color-coded circle | Access level at a glance |
| **Service border** | Severity-colored border | Per-service risk level |

### UX Outcome

When a user opens the Blast Radius page, they should be able to answer these questions **within seconds**:

1. How many independent identities are compromised?
2. Which identity carries the highest risk?
3. Which scopes grant write or admin access?
4. How far does each identity's access reach?

The graph achieves this through spatial layout, color hierarchy, and progressive detail — from the high-level identity card down to individual scope nodes. Numbers and summaries are provided alongside the graph in dedicated cards, but the graph remains the primary decision-making interface.

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
