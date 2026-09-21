# Scalable Architecture Skill

A reusable architecture playbook for AI coding agents.

It teaches an agent how to turn product requirements into maintainable
system boundaries, applications, features, contracts, backend
operations, data access, persistence, shared packages, infrastructure,
and implementation --- without blindly applying a fixed folder template.

## Core idea

> Architecture is a decision system, not a folder template.

``` text
Requirements
    ↓
System Architecture
    ↓
Application Boundaries
    ↓
Repository Architecture
    ↓
Feature Ownership
    ↓
Contracts / APIs
    ↓
Application & Domain Logic
    ↓
Data Access
    ↓
Database
    ↓
Infrastructure
    ↓
Implementation
```

## What this skill optimizes for

-   Requirement-driven architecture
-   Clear application and deployment boundaries
-   Feature-first organization
-   Thin route/framework adapters
-   One-way dependency flow
-   Controlled shared packages
-   Platform-aware UI reuse
-   Runtime validation and type safety
-   Trusted authorization boundaries
-   Database isolation
-   Explicit state ownership
-   Evolutionary scalability
-   Machine-enforceable architecture rules

## When to use it

Use this skill when: - starting a new product that may grow beyond one
small app; - designing a TypeScript monorepo; - building web + mobile +
admin/operations clients; - restructuring a codebase that has unclear
ownership; - asking an AI coding agent to scaffold a scalable project; -
defining architecture before feature implementation.

Do not use it to force a monorepo, microservices, repositories, global
state, or shared packages onto a project that does not need them.

## Agent usage

Give the agent `SKILL.md` together with your project requirements.

Recommended first prompt:

``` text
Read SKILL.md completely and treat it as the architecture decision framework for this project.

Read REQUIREMENTS.md.

Do not create or modify project files yet.

Produce:
1. Requirement interpretation
2. Architecture decisions and trade-offs
3. System architecture
4. Application/deployment boundaries
5. Repository tree
6. Application and feature architecture
7. Backend architecture
8. Database architecture
9. Shared package strategy
10. Dependency rules
11. Critical request/data flows
12. Authentication and authorization strategy
13. Environment/config strategy
14. Testing strategy
15. Scalability strategy
16. Architecture guardrails
17. Initial implementation plan

For every proposed application, package, service, global store, cache, queue, or architectural layer, state the concrete requirement that justifies it.

Remove unjustified abstractions.

Wait for architecture approval before scaffolding implementation.
```

After approving the architecture:

``` text
Architecture approved.

Scaffold the project according to the approved architecture and SKILL.md.

Create only currently justified applications, packages, directories, and infrastructure.

Configure workspace tooling, TypeScript, linting, formatting, environment validation, tests, and architecture-boundary checks.

Do not implement every product feature.

Implement one minimal end-to-end vertical slice to prove the architecture.

Run typecheck, lint, tests, architecture checks, and build.
```

Then build features vertically:

``` text
Implement <FEATURE> end-to-end using SKILL.md and the approved architecture.

Trace:
UI / Client
↓
Route / Adapter
↓
Owning Feature
↓
Runtime Validation
↓
Authentication / Authorization
↓
Application / Domain Logic
↓
Data Access
↓
Database / Integration
↓
Response / Cache
↓
UI Update

Keep feature ownership and dependency boundaries intact.
Add the appropriate tests and run all architecture checks.
```

## Toolkit structure

``` text
scalable-architecture-skill/
├── SKILL.md
├── README.md
├── LICENSE
├── examples/
│   ├── simple-saas.md
│   ├── multi-app-platform.md
│   └── realtime-platform.md
├── templates/
│   ├── REQUIREMENTS.md
│   └── ARCHITECTURE_PROPOSAL.md
├── scripts/
│   └── check-architecture.mjs
└── .github/
    └── workflows/
        └── architecture.yml
```

## Scaling philosophy

The skill distinguishes four kinds of scale.

**Codebase scale:** add features without turning `components/`,
`utils/`, `services/`, or global state into dumping grounds.

**Application scale:** add new clients while keeping apps independent
and moving only genuinely shared responsibilities into packages.

**Team scale:** make ownership visible so teams can work on separate
features/apps without constant cross-module modification.

**Infrastructure scale:** begin with the simplest trusted backend and
database topology, then introduce caching, queues, workers, realtime, or
independent services only when measured requirements justify them.

## Important dependency model

``` text
Routes / Transport
        ↓
Features / Application
        ↓
Contracts / Domain Rules
        ↓
Data Access
        ↓
Database / External Systems
```

Shared packages never depend on applications. Applications never import
another application's source.

## Reference philosophy

This toolkit was generalized from a real multi-application TypeScript
architecture containing independently owned mobile/web applications,
feature-oriented modules, shared design tokens, platform UI packages,
contracts/data-access boundaries, and backend infrastructure.

The reference implementation is evidence for the principles, not a
directory tree that new projects must clone.

## License

MIT.
