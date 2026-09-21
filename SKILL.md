---
description: Design and evolve scalable multi-application TypeScript
  projects using requirement-driven boundaries, feature ownership, thin
  routing layers, disciplined shared packages, controlled data access,
  and enforceable dependency rules.
name: scalable-project-architecture
---

# Scalable Project Architecture Skill

## 1. Purpose

Use this skill when designing a new application ecosystem, restructuring
a growing project, adding a major application to an existing workspace,
or defining architecture before implementation.

This skill creates a requirement-driven architecture that moves from
system boundaries to repository structure, application structure,
features, APIs/services, data access, persistence, shared packages,
infrastructure, and implementation.

It is especially suitable for: - TypeScript product ecosystems with
multiple web/mobile clients. - Monorepos containing multiple
independently deployable applications. - Products where multiple user
roles need distinct application experiences. - Systems that need shared
design systems, contracts, data operations, or infrastructure. -
Projects expected to evolve from an MVP into a larger product without
prematurely adopting distributed architecture.

Do not use this skill to force a monorepo, microservices, repositories,
global state, shared packages, or layered architecture onto a small
project that does not need them. Architecture must be proportional to
actual requirements.

The reference architecture demonstrates an important principle:
**separate deployable applications by user/client responsibility,
organize implementation by feature ownership, and share only stable
cross-application capabilities.**

------------------------------------------------------------------------

## 2. Core Architecture Principles

### 2.1 Requirements before folders

Never begin architecture by generating a preferred directory tree.

First determine: - who uses the system, - which clients they use, -
which workflows exist, - which data is shared, - which capabilities
require trusted execution, - which parts deploy independently, - and
which boundaries need independent ownership.

The repository structure is an output of these decisions.

### 2.2 Applications represent real runtime boundaries

Create separate applications when there is a meaningful difference in: -
user/client experience, - runtime or platform, - deployment lifecycle, -
permissions/security boundary, - navigation model, - operational
responsibility.

Do not create separate apps merely to make the repository look modular.

### 2.3 Feature ownership over technical dumping grounds

Inside an application, organize product behavior primarily by
feature/domain rather than globally grouping every component, hook,
type, and utility.

Preferred:

``` text
src/
  features/
    feature-a/
      screens/
      components/
      hooks/
      api/
      types/
      utils/
```

Avoid:

``` text
src/
  components/
  hooks/
  api/
  types/
  utils/
```

when those directories become unrelated collections of feature-specific
code.

Feature-local code stays with the feature.

### 2.4 Thin route adapters

Routing frameworks define navigation and transport boundaries, not
business ownership.

Routes should primarily: - parse route/search parameters, - perform
route-level authorization/navigation decisions, - invoke feature entry
points, - compose features, - configure layouts/loading/error
boundaries.

Routes should not accumulate feature implementation.

Dependency direction:

``` text
Routes
  ↓
Features
  ↓
App-shared code / Shared packages
```

Features MUST NOT import routes.

### 2.5 Explicit dependency direction

Dependencies must flow from outer orchestration layers toward stable
inner capabilities.

A general flow is:

``` text
Route / Transport
       ↓
Feature / Application
       ↓
Domain rules / Contracts
       ↓
Data-access abstraction
       ↓
Database / External systems
```

Presentation may invoke application behavior but must not become the
owner of persistence or domain invariants.

### 2.6 Share capabilities, not convenience

Shared code is a dependency commitment.

Code belongs in a workspace package only when: - multiple applications
genuinely consume it, - its responsibility is stable and coherent, - it
does not depend on an application, - and central ownership reduces
duplication without coupling unrelated features.

Do not abstract something merely because it *could* be shared. Abstract
it when multiple consumers genuinely need the same responsibility.

### 2.7 Separate platform-specific UI

A common visual language does not require one universal UI package.

Prefer: - shared design tokens for platform-independent visual
decisions, - a mobile UI package for mobile primitives, - a web UI
package for web primitives.

This avoids forcing React Native and browser-specific behavior into one
abstraction while preserving consistency.

### 2.8 Type safety at boundaries

Use TypeScript strictly and validate untrusted runtime data.

Static types do not replace runtime validation.

Validation is required at boundaries such as: - HTTP/API input, - server
actions, - forms before trusted operations, - environment variables, -
external service responses when assumptions matter, - persisted payloads
crossing trust boundaries.

Portable shared request/domain contracts may live in a contracts package
when multiple clients or services consume them.

### 2.9 Server state is not UI state

Keep distinct ownership for: - remote/server state, - ephemeral UI
state, - durable client drafts, - authentication/session state, -
URL/navigation state.

Use query caching for fetched server data when appropriate.

Do not copy fetched entities into a second global store merely for
convenience.

Use local component state for local interaction state. Use a lightweight
global store only for genuine cross-feature client state or durable
workflows.

### 2.10 Security is enforced at trusted boundaries

Navigation guards and hidden screens are not authorization.

Protected operations must validate: 1. identity, 2.
membership/role/capability, 3. resource scope, 4. operation-specific
rules,

on the trusted server/backend boundary.

Database policies or equivalent persistence controls should provide
defense in depth where supported.

Never place privileged server credentials in mobile/browser
applications.

### 2.11 Evolve complexity

Prefer a modular monolith or managed backend until independent services
are justified by concrete scaling, reliability, security,
organizational, or deployment requirements.

Do not introduce microservices for theoretical future scale.

------------------------------------------------------------------------

## 3. Architecture Decision Process

Before creating files, produce an architecture brief.

### Step 1 --- Understand the product

Identify: - product purpose, - primary workflows, - user types, - client
platforms, - critical paths, - security/privacy requirements, - expected
scale, - expected team size, - offline/realtime requirements.

### Step 2 --- Identify application boundaries

For every user/client combination ask:

1.  Does it have a substantially different UX/navigation model?
2.  Does it need different device capabilities?
3.  Does it have a different permission surface?
4.  Does it deploy independently?
5.  Does it have a distinct operational purpose?

If several answers are yes, consider a separate application.

### Step 3 --- Identify backend responsibilities

Determine whether the system needs: - CRUD APIs, - transactional
workflows, - atomic state transitions, - realtime subscriptions, -
background jobs, - scheduled jobs, - notifications, - file storage, -
search, - payments, - location/geospatial operations, - external
integrations.

Do not create backend layers that have no responsibility yet.

### Step 4 --- Identify shared responsibilities

Classify each candidate as: - feature-local, - application-shared, -
workspace-shared, - infrastructure/backend-owned.

Promote code upward only when its consumers justify the move.

### Step 5 --- Define trust boundaries

Document: - authentication source, - authorization model, - resource
ownership, - tenant/organization/facility scope if applicable, -
privileged operations, - public versus trusted environment variables, -
audit requirements.

### Step 6 --- Define data ownership

For every important entity/workflow determine: - source of truth, -
readers, - writers, - transaction boundaries, - cache behavior, -
realtime behavior, - retry/idempotency requirements.

### Step 7 --- Define deployment boundaries

A package is not a deployment.

Document which units deploy independently and which are build-time
dependencies only.

### Step 8 --- Validate simplicity

For every layer/package/service ask:

> What concrete responsibility does this boundary own today or in the
> immediately planned implementation?

If the answer is unclear, remove the boundary.

------------------------------------------------------------------------

## 4. System Architecture

Start with the simplest topology capable of satisfying requirements.

Typical structure:

``` text
Clients
├── Web application(s)
├── Mobile application(s)
└── Other clients
        │
        ▼
Trusted backend boundary
├── Authentication / authorization
├── Application workflows
├── Atomic operations
├── Realtime / events
└── Integrations
        │
        ▼
Persistence
├── Database
├── Object storage
└── Cache / queue when required
```

### Application

Create an application when it is an independently runnable/deployable
client or service with a coherent responsibility.

### Feature

Create a feature when a capability: - represents recognizable product
behavior, - owns UI and/or application behavior, - can expose a
deliberate public entry point, - and should evolve without leaking
internals into unrelated features.

### Module

Use a module for a cohesive implementation responsibility inside a
feature or service. A module does not need to be independently
deployable.

### Shared package

Create a package when a stable capability has multiple legitimate
workspace consumers.

Examples: - design tokens, - mobile UI primitives, - web UI
primitives, - portable contracts, - shared data operations, -
lint/TypeScript configuration.

### Service

Create an independently deployable service only when a real boundary
requires it, such as: - independent scaling, - independent release
lifecycle, - isolation/failure containment, - special runtime
requirements, - strong security boundary, - clear organizational
ownership.

### Shared utility

A shared utility must be small, generic, deterministic where possible,
and genuinely cross-feature. Domain-specific helpers belong to their
feature.

------------------------------------------------------------------------

## 5. Repository Architecture

For a multi-application TypeScript system, prefer a workspace structure
such as:

``` text
project/
├── apps/
│   ├── web/
│   ├── mobile-a/
│   └── mobile-b/
├── packages/
│   ├── design-tokens/
│   ├── web-ui/
│   ├── mobile-ui/
│   ├── contracts/
│   └── data-access/
├── backend/              # or provider-specific root when appropriate
├── tooling/              # only if shared tooling becomes substantial
├── scripts/              # repository automation
├── docs/                 # durable architecture/product docs
├── package.json
├── workspace config
├── task-runner config
└── base TypeScript config
```

### `apps/`

Contains independently runnable applications.

Applications MAY depend on packages.

Applications MUST NOT import source code from another application.

### `packages/`

Contains reusable workspace capabilities.

Packages MUST NOT depend on applications.

Keep public exports deliberate. Consumers should depend on package APIs
rather than arbitrary internal paths.

### `backend/` or provider-specific infrastructure

Use when backend schema, migrations, functions, policies, seeds, or
infrastructure have repository-level ownership.

Do not put client-only code here.

### `tooling/`

Create only when shared lint, TypeScript, build, testing,
code-generation, or developer tooling becomes substantial enough to
justify dedicated packages/configuration.

### `scripts/`

Use for repository automation and architecture checks, not product
business logic.

### `docs/`

Use for durable architecture decisions, product contracts, runbooks, and
ADRs. Do not duplicate code documentation unnecessarily.

------------------------------------------------------------------------

## 6. Application Architecture

A scalable application should prefer feature ownership with thin
framework adapters.

Example:

``` text
src/
├── app/                  # routes/layouts/framework adapters
├── features/
│   ├── auth/
│   ├── feature-a/
│   └── feature-b/
├── components/           # app-wide presentation only
├── services/             # app/platform integration setup
├── providers/            # app-wide providers when needed
├── stores/               # genuine cross-feature client state
├── hooks/                # cross-feature hooks only
├── types/                # cross-feature app types only
├── utils/                # cross-feature app helpers only
└── lib/                  # small framework/app infrastructure
```

A feature may contain:

``` text
features/example/
├── index.ts
├── screens/
├── components/
├── hooks/
├── api/                  # client-facing feature data operations
├── server/               # framework server operations when applicable
├── schemas/
├── types/
├── utils/
└── tests/
```

Create only directories that have implementation.

### Feature public API

Use `index.ts` when a feature needs a deliberate public surface.

Routes and external consumers should import supported feature entry
points rather than internal files.

### Cross-feature composition

Features SHOULD NOT import one another by default.

When workflows combine multiple features, prefer composition at: - route
level, - application orchestration layer, - or a deliberately introduced
higher-level workflow feature.

This prevents a dependency graph of mutually coupled product features.

### Components

Use three scopes:

``` text
feature component
→ application-shared component
→ workspace UI primitive
```

Promote a component only when its responsibility becomes broader.

### Hooks

Feature-specific hooks stay in the feature.

App-wide hooks belong in `src/hooks`.

Generic reusable behavior may become a package only with multiple
application consumers.

### Configuration

Platform/session/client initialization stays in the owning application
when it depends on: - browser cookies, - secure mobile storage, - device
APIs, - framework request context, - platform environment handling.

Do not move platform-specific client setup into generic data packages.

------------------------------------------------------------------------

## 7. Backend Architecture

Use the minimum layering necessary to keep trusted workflows
understandable.

Preferred conceptual flow:

``` text
Transport / Route / Server Action
            ↓
Runtime Validation
            ↓
Authentication + Authorization
            ↓
Application Workflow / Service
            ↓
Domain Rules
            ↓
Repository / Data Operation
            ↓
Database / External Integration
```

Not every project needs a physical folder for every conceptual layer.

### Transport/API layer

Owns: - protocol/framework adaptation, - request parsing, - response
formatting, - calling trusted application operations.

It MUST NOT own substantial domain logic.

### Validation

Validate untrusted inputs before business execution.

Shared portable schemas belong in a contracts package only when
genuinely consumed across boundaries.

### Application/service layer

Owns use cases and workflow orchestration.

Examples: - reserve a resource, - confirm a booking, - dispatch a job, -
process a payment state transition.

### Domain rules

Own invariants independent of transport and UI.

Do not bury critical rules in components or route handlers.

### Repository/data operations

Own persistence-facing operations.

They should expose intent-oriented operations rather than leaking
arbitrary database access everywhere.

### Atomic operations

Multi-step state transitions that must succeed or fail together belong
in transactions, database functions, or another trusted atomic boundary.

Retryable commands SHOULD support idempotency when duplicate execution
would be harmful.

### Forbidden shortcuts

MUST NOT:

``` text
UI → Database privileged credentials
UI → unrestricted persistence mutation
Route → scattered raw database writes for a multi-step invariant
Shared package → application-specific session handling
```

------------------------------------------------------------------------

## 8. Database Architecture

The database is a source of truth, not merely storage behind UI screens.

### Schema

Organize schemas around stable domain concepts and relationships.

Use: - foreign keys, - uniqueness constraints, - check constraints, -
non-null constraints, - database enums only when appropriate, - indexes
based on real access patterns.

Do not rely solely on frontend validation for data integrity.

### Migrations

All schema changes MUST be reproducible through migrations or the chosen
schema-management workflow.

Do not manually modify production state without a reproducible change
path.

### Relationships

Model real ownership/cardinality explicitly.

Avoid duplicating the same fact across tables unless denormalization has
a measured reason and synchronization strategy.

### Indexes

Add indexes for: - foreign-key access patterns where useful, - common
filters, - sorting/pagination paths, - uniqueness, - measured query
bottlenecks.

Do not add indexes speculatively to every field.

### Transactions

Use transactions for operations where partial completion would violate
invariants.

### Authorization at persistence

When the database/platform supports row-level security or equivalent
policies, use it as defense in depth.

Client-side route visibility never replaces data authorization.

### Database clients

Keep privileged clients server-side.

Client applications receive only credentials intended for untrusted
clients and remain constrained by backend authorization/policies.

------------------------------------------------------------------------

## 9. Shared Package Strategy

Use the following promotion ladder:

``` text
Feature-local
    ↓
Application-shared
    ↓
Workspace package
```

Do not skip directly to a workspace package.

### Feature-local

Use when one feature owns the behavior.

### Application-shared

Use when multiple unrelated features inside one app consume the
capability.

### Workspace-shared

Use when multiple applications genuinely need the same stable
responsibility.

### Recommended package categories

#### Design tokens

Own platform-independent visual decisions: - colors, - spacing, -
typography scales, - radius, - shadows, - gradients.

#### Platform UI packages

Own reusable presentation primitives for one runtime family.

For example, keep web and native UI implementations separate while
sharing tokens.

#### Contracts

Own portable: - validation schemas, - DTO-like boundary types, - shared
domain identifiers/enums when appropriate.

Contracts MUST NOT import React, routing frameworks, cookies, device
APIs, or server secrets.

#### Data access

Own genuinely reusable data operations and generated database types when
multiple applications/services need them.

Prefer passing an application-configured client into reusable
operations.

Data-access packages MUST NOT own: - framework cookie handling, - React
hooks, - app providers, - navigation, - privileged credentials embedded
in package code.

### Public APIs

Shared packages SHOULD expose intentional entry points.

Avoid consumers depending on deep implementation paths unless explicitly
supported.

------------------------------------------------------------------------

## 10. Dependency Rules

The default dependency graph is:

``` text
apps/* ───────────────► packages/*
  │
  └── feature/routes
          ↓
       features
          ↓
  app-shared modules
          ↓
   shared packages
```

### Allowed

``` text
route → feature public API
feature → same-feature internals
feature → app-shared presentation/helper
feature → approved shared package
mobile-ui → design-tokens
web-ui → design-tokens
application → contracts
application/backend → data-access
```

### Prohibited

``` text
package → app
feature A → feature B              # default rule
feature → route
shared component → feature
mobile-ui → mobile application
web-ui → web application
contracts → UI/framework code
data-access → React/navigation
app A → app B source files
```

### Circular dependencies

MUST NOT create cycles.

If two modules need each other: 1. identify the true owner, 2. extract a
lower-level shared responsibility if it is genuinely shared, 3. or
compose them from a higher layer.

Do not solve cycles with path aliases or barrel files.

### Architecture enforcement

For important boundaries, encode rules in: - ESLint/import rules, -
custom architecture scripts, - dependency graph checks, - tests, - CI.

Architecture documentation alone is insufficient for rules that must
remain invariant.

------------------------------------------------------------------------

## 11. Feature Creation Workflow

When implementing a new feature, follow this sequence:

``` text
Understand requirement
        ↓
Identify owning application
        ↓
Identify feature boundary
        ↓
Define user/data workflow
        ↓
Define source of truth
        ↓
Define contracts + validation
        ↓
Define authorization rules
        ↓
Define API/application operation
        ↓
Define persistence changes
        ↓
Implement feature UI/state
        ↓
Compose from route
        ↓
Add tests
        ↓
Run architecture checks
```

### Step 1 --- Ownership

Choose one owning feature/application.

Do not begin by putting files into shared directories.

### Step 2 --- Data model

Determine whether the feature: - reads existing entities, - creates a
new entity, - introduces a new state transition, - needs transactional
behavior, - needs realtime updates.

### Step 3 --- Contract

Define runtime input/output validation where the boundary is untrusted.

### Step 4 --- Trusted operation

Implement authorization and business rules before persistence mutation.

### Step 5 --- UI

Keep UI focused on: - rendering, - interaction, - local state, -
invoking application operations.

### Step 6 --- Sharing decision

Only after implementation, determine whether any capability has
legitimate consumers outside the feature.

### Step 7 --- Verification

Run: - typecheck, - lint, - unit tests, - integration tests, -
architecture boundary checks, - production build where appropriate.

------------------------------------------------------------------------

## 12. Scaling Rules

### When features grow

Split by subdomain or workflow inside the feature before creating a new
service.

Keep the feature public API deliberate.

### When teams grow

Strengthen ownership and automated dependency rules.

Consider CODEOWNERS/ownership documentation and ADRs for significant
boundaries.

Do not compensate for unclear ownership by creating more services.

### When applications multiply

Move genuinely shared stable responsibilities into packages.

Do not allow applications to import one another.

### When database complexity grows

Introduce: - explicit transaction boundaries, - query
modules/repositories, - indexes based on access patterns, - database
integration tests, - policy tests, - audit trails where required.

### When API traffic grows

Measure first.

Then consider: - query optimization, - pagination, - caching, -
batching, - connection pooling, - read replicas, - rate limiting, -
asynchronous processing.

Do not begin with distributed services without evidence.

### When background processing becomes necessary

Introduce a job/queue boundary for work that: - is slow, - is
retryable, - should not block a request, - has independent
execution/reliability requirements.

Jobs must be idempotent where retries are possible.

### When realtime becomes necessary

Use realtime only for workflows that benefit from fresh state.

Scope subscriptions to authorized resources and clean them up correctly.

Do not mirror the entire database into realtime state.

### When microservices become justified

Consider extraction only when a module has a clear reason such as: -
independent scale, - strong failure isolation, - different runtime, -
separate deployment cadence, - regulatory/security isolation, - mature
ownership boundary.

Extract from an already coherent module; do not invent a service
boundary before the domain boundary exists.

------------------------------------------------------------------------

## 13. Anti-Patterns

### Giant shared folders

**Problem:** unrelated code loses ownership.

**Alternative:** keep code feature-local and promote it only when reuse
is real.

### Random utility dumping grounds

**Problem:** `utils/` becomes a hidden dependency hub.

**Alternative:** keep domain helpers with their feature; reserve global
utilities for truly cross-feature helpers.

### Business logic inside UI components

**Problem:** rules become difficult to test and reuse.

**Alternative:** move workflows/invariants into
feature/application/domain functions.

### Database access from UI

**Problem:** persistence and authorization leak into presentation.

**Alternative:** UI calls trusted operations or constrained data APIs.

### Duplicated validation schemas

**Problem:** clients and backend drift.

**Alternative:** share portable contracts when multiple boundaries
require the same contract.

### Circular dependencies

**Problem:** ownership is unclear.

**Alternative:** move the shared responsibility downward or
orchestration upward.

### Unnecessary microservices

**Problem:** operational complexity arrives before product scale.

**Alternative:** modular monolith/managed backend with strong internal
boundaries.

### Premature abstractions

**Problem:** abstractions encode guesses rather than stable patterns.

**Alternative:** implement locally, observe repetition, then extract.

### Oversized global state

**Problem:** server data, UI state, and drafts become coupled.

**Alternative:** query cache for server state, local state for local UI,
global client store only for genuine cross-feature state.

### Cross-app imports

**Problem:** independently runnable apps become coupled at source level.

**Alternative:** extract stable common behavior into a package.

### Framework logic leaking into domain logic

**Problem:** business behavior becomes tied to
routing/cookies/components.

**Alternative:** adapt framework inputs at the boundary and pass plain
typed values inward.

### Empty architecture for appearance

**Problem:** dozens of unused directories imply layers that do not
exist.

**Alternative:** create a directory/layer when implementation gives it a
responsibility.

------------------------------------------------------------------------

## 14. Architecture Guardrails

### MUST

-   MUST understand requirements before generating repository structure.
-   MUST identify application and deployment boundaries explicitly.
-   MUST keep route/framework adapters thin.
-   MUST preserve one-way dependency direction.
-   MUST keep feature-specific code inside its owning feature.
-   MUST validate untrusted runtime input at trusted boundaries.
-   MUST enforce authorization server-side for protected operations.
-   MUST keep privileged credentials out of client applications.
-   MUST keep shared packages independent of applications.
-   MUST distinguish server state from client UI state.
-   MUST use reproducible database migrations/schema changes.
-   MUST protect multi-step invariants with atomic operations when
    required.
-   MUST prevent circular dependencies.
-   MUST verify architecture after major structural changes.

### SHOULD

-   SHOULD organize growing applications by product feature/domain.
-   SHOULD expose deliberate feature/package public APIs.
-   SHOULD use strict TypeScript.
-   SHOULD share design tokens across platform UI systems.
-   SHOULD keep web and native UI implementations platform-specific when
    their primitives differ.
-   SHOULD compose cross-feature workflows at a higher orchestration
    boundary.
-   SHOULD use URL state for shareable web filters/sorting/pagination.
-   SHOULD paginate potentially large queries.
-   SHOULD select only required fields from persistence.
-   SHOULD include identity/tenant/resource scope in user-specific cache
    keys.
-   SHOULD add automated architecture checks for important dependency
    rules.
-   SHOULD prefer evolutionary architecture.

### MAY

-   MAY use a monorepo when multiple applications/packages benefit from
    coordinated development.
-   MAY use a query cache for remote server state.
-   MAY use a global client store for genuine cross-feature client
    state.
-   MAY introduce repositories/services when they clarify real
    responsibilities.
-   MAY introduce background jobs, realtime, caching, or services when
    requirements justify them.

### SHOULD NOT

-   SHOULD NOT create shared packages for one consumer without a clear
    near-term reason.
-   SHOULD NOT duplicate fetched server records into global client
    state.
-   SHOULD NOT put feature-specific components into global component
    folders.
-   SHOULD NOT export every internal module through barrel files.
-   SHOULD NOT create indexes, caches, queues, or services solely for
    hypothetical scale.
-   SHOULD NOT mix privileged backend configuration with client
    configuration.

### MUST NOT

-   MUST NOT allow applications to import another application's source.
-   MUST NOT allow shared packages to import applications.
-   MUST NOT allow lower layers to import routes.
-   MUST NOT use navigation guards as the only authorization mechanism.
-   MUST NOT expose server secrets through public environment variables.
-   MUST NOT place business invariants exclusively in UI code.
-   MUST NOT introduce a new architectural layer without a concrete
    responsibility.
-   MUST NOT introduce microservices merely because the system may grow
    later.

------------------------------------------------------------------------

## 15. Architecture Validation Checklist

Before approving a project architecture, verify:

### System

-   [ ] Every application represents a real runtime/user/deployment
    boundary.
-   [ ] Backend responsibilities are explicit.
-   [ ] Trust boundaries are documented.
-   [ ] Deployment units are distinguished from code-sharing packages.

### Repository

-   [ ] Every top-level directory has a clear responsibility.
-   [ ] No directory exists only to imitate a template.
-   [ ] Applications do not import other applications.
-   [ ] Shared packages do not import applications.

### Applications

-   [ ] Routes are thin adapters.
-   [ ] Product behavior has clear feature ownership.
-   [ ] Feature-local code has not leaked into global folders.
-   [ ] Cross-feature dependencies are avoided or explicitly justified.
-   [ ] Platform integration setup remains app-owned.

### State

-   [ ] Server state uses an appropriate server/query ownership model.
-   [ ] Local UI state remains local.
-   [ ] Global stores contain only genuine cross-feature client state.
-   [ ] Authentication has one authoritative session source.

### Backend

-   [ ] Untrusted inputs are runtime validated.
-   [ ] Protected operations authenticate and authorize.
-   [ ] Important state transitions are atomic.
-   [ ] Retryable destructive/financial/dispatch-like operations
    consider idempotency.
-   [ ] Sensitive information is not unnecessarily logged.

### Database

-   [ ] Relationships and constraints enforce important invariants.
-   [ ] Schema changes are reproducible.
-   [ ] Indexes correspond to real query patterns.
-   [ ] Persistence authorization/policies are tested where applicable.
-   [ ] Privileged credentials never reach clients.

### Shared packages

-   [ ] Every package has multiple legitimate consumers or a strong
    architectural reason.
-   [ ] Public APIs are intentional.
-   [ ] Contracts remain framework-portable.
-   [ ] Data access does not own app-specific session/framework
    behavior.
-   [ ] UI packages remain platform-appropriate.

### Quality

-   [ ] Typecheck passes.
-   [ ] Lint passes.
-   [ ] Relevant unit/integration/E2E tests pass.
-   [ ] Architecture checks pass.
-   [ ] Production build succeeds where applicable.

### Scalability

-   [ ] The design can add features without expanding global dumping
    grounds.
-   [ ] New applications can consume stable shared packages without
    source coupling.
-   [ ] Backend workflows can later move to jobs/services without
    rewriting UI ownership.
-   [ ] Complexity has not been introduced before requirements justify
    it.

------------------------------------------------------------------------

## 16. Expected Agent Output

When this skill is used to architect a new project, the agent MUST first
produce an architecture proposal before generating implementation.

The proposal must contain:

1.  **Requirement interpretation**
    -   users,
    -   clients,
    -   workflows,
    -   constraints,
    -   assumptions.
2.  **Architecture decisions**
    -   chosen boundaries,
    -   rejected unnecessary complexity,
    -   major trade-offs.
3.  **System architecture**
    -   applications,
    -   backend,
    -   persistence,
    -   external integrations,
    -   communication paths.
4.  **Repository tree**
    -   only directories justified by actual responsibilities.
5.  **Application architecture**
    -   route ownership,
    -   feature boundaries,
    -   shared application code,
    -   state strategy.
6.  **Backend architecture**
    -   trusted operations,
    -   validation,
    -   authorization,
    -   transactions,
    -   external integrations.
7.  **Database architecture**
    -   entity ownership,
    -   relationships,
    -   constraints,
    -   migrations,
    -   indexing strategy.
8.  **Shared package architecture**
    -   package responsibility,
    -   consumers,
    -   allowed dependencies,
    -   public API.
9.  **Dependency rules**
    -   allowed and forbidden imports,
    -   direction of dependencies,
    -   cycle prevention.
10. **Data/request flows**
    -   trace critical workflows end-to-end.
11. **Environment/config strategy**
    -   public/client variables,
    -   server-only secrets,
    -   per-app configuration.
12. **Testing strategy**
    -   unit,
    -   integration,
    -   database/policy,
    -   E2E,
    -   architecture regression checks.
13. **Scalability considerations**
    -   likely future pressure points,
    -   what should remain simple now,
    -   triggers for introducing additional infrastructure.
14. **Architecture guardrails**
    -   project-specific MUST/SHOULD/MUST NOT rules.
15. **Initial implementation plan**
    -   ordered setup steps from workspace initialization through the
        first vertical slice.

Only after this proposal is internally coherent should the agent create
the project structure.

------------------------------------------------------------------------

# Architecture Construction Procedure

When actually setting up a project, follow this order:

``` text
1. Parse requirements
2. Identify users and runtime clients
3. Define application/deployment boundaries
4. Define trust and data boundaries
5. Choose the simplest viable backend topology
6. Define repository workspace
7. Define feature ownership inside each app
8. Define shared-package candidates
9. Remove premature shared abstractions
10. Define contracts and validation boundaries
11. Define persistence and transaction strategy
12. Define state ownership
13. Define dependency rules
14. Define verification/architecture checks
15. Scaffold only required directories
16. Implement one end-to-end vertical slice
17. Validate the architecture with real implementation
18. Extract shared code only when reuse becomes concrete
```

The first vertical slice should prove the complete path:

``` text
User interaction
      ↓
Route / Screen
      ↓
Owning Feature
      ↓
Validated operation
      ↓
Authorization
      ↓
Application/domain logic
      ↓
Data access
      ↓
Database / integration
      ↓
Response / query cache
      ↓
UI update
```

A structure that looks scalable but cannot cleanly support one real
vertical workflow is not validated architecture.

------------------------------------------------------------------------

# Decision Heuristics

Use these questions repeatedly.

### Should this be another app?

Create another app when the runtime, user experience, permissions,
deployment, or operational purpose is materially different.

Otherwise keep it in the existing app.

### Should this be another feature?

Create another feature when the behavior has a coherent product
responsibility and can own its UI/data interactions.

Otherwise keep it inside the existing feature/module.

### Should this move to `src/components`?

Only when unrelated features in the same application genuinely use the
presentation component.

Otherwise keep it feature-local.

### Should this become a workspace UI component?

Only when multiple applications on the same platform need the same
generic primitive.

Otherwise keep it application-local.

### Should this become a contract?

Only when a runtime boundary or multiple consumers need the same
portable validated shape.

Otherwise keep the schema with its owner.

### Should this become shared data access?

Only when the same persistence operation is legitimately reused and can
remain independent of framework/session setup.

Otherwise keep it with the owning backend/feature.

### Should this become a service?

Only when independent deployment solves a demonstrated problem.

Otherwise keep the module inside the existing backend.

------------------------------------------------------------------------

# Final Critical Rule

The architecture is a **decision system, not a folder template**.

Preserve these qualities:

-   clear ownership,
-   one-way dependencies,
-   thin framework adapters,
-   feature isolation,
-   controlled sharing,
-   platform-aware UI reuse,
-   portable contracts,
-   trusted authorization,
-   isolated persistence,
-   explicit state ownership,
-   enforceable boundaries,
-   evolutionary scalability.

Adapt the physical structure to the project's: - requirements, -
technology stack, - number of applications, - user types, - deployment
model, - security model, - expected scale, - team size, - and domain
complexity.

The goal is not to reproduce the reference repository's folders.

The goal is to reproduce the reasoning that keeps a growing
multi-application system understandable, testable, secure, and scalable.
