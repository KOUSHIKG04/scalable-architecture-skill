---
name: vaastu
license: MIT
description: Design or restructure multi-application TypeScript systems from product requirements. Use for architecture proposals, application and feature boundaries, shared packages, trusted backend operations, and dependency rules; avoid imposing a monorepo or extra layers on small projects.
---

# Vaastu Skill

Turn requirements into justified boundaries and prove them with a real workflow. Adapt to the project's stack, existing conventions, team, deployment constraints, and scale. Architecture is a decision system, not a fixed folder template.

## Workflow

1. Inspect the existing repository and the user's requirements. Identify users, clients, workflows, deployment units, trust boundaries, data ownership, and operational constraints. Capture measurable non-functional acceptance criteria, including workload, performance, availability, security/privacy, operating budget and recovery when relevant. Mark unknown targets instead of inventing them. State assumptions; ask only for missing information that materially changes the design.
2. Choose the simplest topology that meets those requirements. Explain the concrete responsibility of every proposed application, package, service, global store, cache, queue, and layer. Remove speculative abstractions.
3. Present an architecture brief before scaffolding a new system. Cover decisions and trade-offs, ownership, allowed dependencies, critical request/data flows, security, state, persistence, deployment, verification, and the first implementation slice. Scale detail to the task; a focused change does not require a full-system proposal. Record architecturally significant decisions in ADRs or the project’s equivalent decision log, including alternatives, consequences and revisit conditions. Use the [proposal template](templates/ARCHITECTURE_PROPOSAL.md) as a checklist, not a required document for every task.
4. Work within the user's authorization. Preserve existing behavior, data, routes, permissions, and unrelated changes during restructuring. If the user requested only a proposal, stop at the proposal; an implementation request permits the agreed implementation work.
5. Implement one end-to-end vertical slice before expanding the structure. Trace input through the owning feature, validation, authorization, domain behavior, persistence/integration, and response/UI state where those layers apply. Use explicit acceptance criteria and the feature Definition of Done; revisit significant decisions when requirements or evidence change.
6. Verify the boundaries and behavior with checks appropriate to the change. Include applicable security/data-lifecycle, CI, release/recovery and operational checks; keep their depth proportional to the risk and delivery stage. Report what passed, what failed, and what was not exercised, with environment and evidence. Distinguish implementation, tested behavior, deployment and operational acceptance. Source inspection or a starter boundary script does not establish production correctness or security.

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
- [Architecture failure prevention and remediation](references/architecture-failure-remediation.md): for an affected architecture decision, use its Detect / Prevent / Fix / Verify guidance during design or authorized repair. Select relevant decisions; this is not an automatic audit or a requirement to redesign all 14 areas.
- [Feature delivery and evolution](references/feature-delivery.md): define per-feature completion, review architectural impact and revisit significant decisions during incremental work.
- [Security and data lifecycle](references/security-checklist.md): turn affected trust boundaries, permissions and sensitive-data risks into verifiable acceptance cases.
- [Deployment readiness](references/deployment-readiness.md): assess CI, migrations, recovery, observability and operational ownership for releases.
- [ADR template](templates/ADR.md): record a significant decision when no project decision-log format exists; preserve history with superseding records.
- [Feature specification](templates/FEATURE_SPEC.md): document a substantial workflow’s scope, contracts and evidence; small changes do not need a separate specification.
- [Scalability guide](references/scalability-guide.md): evaluate measured pressure and triggers for caches, workers, or service extraction.
- [Requirements template](templates/REQUIREMENTS.md): gather product requirements when starting a new system; reuse existing requirements where available.
- [Full-project implementation prompt](templates/PROJECT_IMPLEMENTATION_PROMPT.md): use when the user wants a substantial architecture-and-implementation task with a project brief, explicit scope, acceptance criteria, and verified vertical slices. Keep the normal workflow concise for focused work.
- [Architecture proposal template](templates/ARCHITECTURE_PROPOSAL.md): structure a substantial proposal without inventing missing requirements.
- [Small and large project examples](examples/using-vaastu.md): choose the right depth of planning and verification, with copyable focused-task and full-project requests.
- [Simple SaaS](examples/simple-saas.md), [multi-app platform](examples/multi-app-platform.md), and [realtime platform](examples/realtime-platform.md): read the closest example only when a concrete comparison helps. Examples are illustrative, not mandatory layouts.
- [Boundary-check starter](scripts/check-architecture.mjs): adapt its rules to the chosen architecture before treating it as enforcement. Run it with the target project as the working directory. It checks limited import patterns, does not resolve all aliases or detect every dependency violation, and does not replace typecheck, integration tests, or security review.
