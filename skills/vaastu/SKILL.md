---
name: vaastu
license: MIT
description: Design or restructure multi-application TypeScript systems from product requirements. Use for architecture proposals, application and feature boundaries, shared packages, trusted backend operations, and dependency rules; avoid imposing a monorepo or extra layers on small projects.
---

# Vaastu Skill

Turn requirements into justified boundaries and prove them with a real workflow. Adapt to the project's stack, existing conventions, team, deployment constraints, and scale. Architecture is a decision system, not a fixed folder template.

## Workflow

1. Inspect the existing repository and the user's requirements. Identify users, clients, workflows, deployment units, trust boundaries, data ownership, and operational constraints. State assumptions; ask only for missing information that materially changes the design.
2. Choose the simplest topology that meets those requirements. Explain the concrete responsibility of every proposed application, package, service, global store, cache, queue, and layer. Remove speculative abstractions.
3. Present an architecture brief before scaffolding a new system. Cover decisions and trade-offs, ownership, allowed dependencies, critical request/data flows, security, state, persistence, deployment, verification, and the first implementation slice. Scale detail to the task; a focused change does not require a full-system proposal. Use the [proposal template](templates/ARCHITECTURE_PROPOSAL.md) as a checklist, not a required document for every task.
4. Work within the user's authorization. Preserve existing behavior, data, routes, permissions, and unrelated changes during restructuring. If the user requested only a proposal, stop at the proposal; an implementation request permits the agreed implementation work.
5. Implement one end-to-end vertical slice before expanding the structure. Trace input through the owning feature, validation, authorization, domain behavior, persistence/integration, and response/UI state.
6. Verify the boundaries and behavior with checks appropriate to the change. Report what passed, what failed, and what was not exercised. Source inspection or a starter boundary script does not establish production correctness or security.

## Essential constraints

- Keep applications independently owned; applications must not import another application's source. Shared packages must not depend on applications.
- Keep routes and transport adapters thin. Feature-specific behavior belongs to the owning feature; lower layers must not import routes.
- Share stable capabilities with real consumers. Keep public APIs deliberate and dependencies acyclic. Separate web and native UI primitives when their platforms require it.
- Validate untrusted runtime inputs and enforce identity, authorization, resource scope, and domain invariants at trusted boundaries. Never expose privileged credentials to clients.
- Make important multi-step state changes atomic; consider idempotency for retryable operations. Use reproducible persistence changes and verify permissions where applicable.
- Give server/query state, local UI state, URL state, durable drafts, and sessions explicit ownership. Avoid duplicate sources of truth.
- Add infrastructure or independently deployed services only when requirements or measurements justify the cost.

## Read supporting resources when needed

Paths below are relative to this skill folder.

- [Architecture principles](references/architecture-principles.md): review ownership, boundaries, state, and security decisions.
- [Detailed architecture playbook](references/architecture-playbook.md): consult the relevant sections for application/backend/data design, guardrails, review checklists, and construction guidance. Its full proposal outline applies to substantial new-system work; scale it to the user's task.
- [Dependency rules](references/dependency-rules.md): define allowed imports and choose enforcement mechanisms.
- [Scalability guide](references/scalability-guide.md): evaluate measured pressure and triggers for caches, workers, or service extraction.
- [Requirements template](templates/REQUIREMENTS.md): gather product requirements when starting a new system; reuse existing requirements where available.
- [Architecture proposal template](templates/ARCHITECTURE_PROPOSAL.md): structure a substantial proposal without inventing missing requirements.
- [Simple SaaS](examples/simple-saas.md), [multi-app platform](examples/multi-app-platform.md), and [realtime platform](examples/realtime-platform.md): read the closest example only when a concrete comparison helps. Examples are illustrative, not mandatory layouts.
- [Boundary-check starter](scripts/check-architecture.mjs): adapt its rules to the chosen architecture before treating it as enforcement. Run it with the target project as the working directory. It checks limited import patterns, does not resolve all aliases or detect every dependency violation, and does not replace typecheck, integration tests, or security review.
