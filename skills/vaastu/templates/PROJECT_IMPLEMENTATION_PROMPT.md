# Project Architecture and End-to-End Implementation Using Vaastu

Use this optional template for a substantial project build or a scoped implementation across an existing system. Fill in the project brief, or point to existing requirements instead of duplicating them. For a focused change, the short Vaastu prompt is sufficient.

## Project brief

- Project name and purpose: [What are you building, for whom, and why?]
- Users and roles: [Important permissions and workflows.]
- Required clients: [Web, mobile, operations, API, or other actual requirements.]
- Existing implementation: [Repository state and behavior that must be preserved.]
- Technology constraints: [Required stack, deployment environment, and integrations.]
- Delivery constraints: [Budget, timeline, team, performance, privacy, accessibility, or offline needs.]
- Current goal: [PoC, MVP, or a defined release; state its acceptance criteria.]
- Implementation scope: [Must-have workflows to complete in this task.]
- Out of scope: [Later features and unrelated areas.]
- Requirements source: [Existing document or the details above.]

## Task and authorization

Read .agents/skills/vaastu/SKILL.md and use it as the architecture decision framework. Consult only relevant references, examples, and templates; do not copy an example topology by default.

This is an architecture-and-implementation request for the scope above. Present a concise architecture brief and implementation plan before substantial edits, then continue with the authorized implementation. If my current request explicitly asks only for a proposal, stop after the proposal. Do not treat an unreviewed plan as already approved or introduce an additional approval gate when implementation is already authorized.

Ask for missing information only when it materially changes correctness, scope, architecture, or acceptance. Otherwise state reasonable assumptions and continue. Requirements for future expansion are not permission to implement future features.

Follow the authorization in the current conversation for external actions. This template alone does not authorize publishing, deployment, live-data changes, or paid provisioning.

## Inspect and reuse the existing system

Read the repository guidance, relevant applications, dependencies, configuration, feature boundaries, integrations, persistence, authentication, authorization, and existing checks. Trace a real workflow when one exists.

Distinguish existing behavior, reusable code, necessary changes, and missing functionality. Cite file evidence for architectural findings and separate confirmed issues from questions needing runtime verification. Keep this inspection proportional to the requested work; it is not automatically a comprehensive security audit.

Preserve unrelated working-tree changes, routes, public contracts, permissions, user data, in-progress state, and existing UI/UX unless the task requires changing them. Do not rewrite working functionality just to match a preferred structure. For an empty repository, derive the initial structure from the requirements.

## Define only the architecture this task needs

Cover relevant decisions and trade-offs:

- Requirements, assumptions, and acceptance criteria.
- System topology, runtimes, application and deployment boundaries.
- Repository organization, feature ownership, and public module APIs.
- Backend responsibilities, input validation, and trusted authorization boundaries.
- Persistence, data ownership, migrations, transactions, and integration contracts.
- Shared-code consumers, allowed dependencies, and import boundaries.
- URL, component, server/query, session, and durable-draft state ownership.
- Environment configuration, observability, failure handling, and verification.
- Measured or requirement-driven scalability triggers.
- First end-to-end vertical slice and dependency-ordered implementation.

Explain the concrete requirement for each application, service, package, store, cache, queue, or layer. Start with the simplest design that meets the acceptance criteria. Omit irrelevant decisions and avoid speculative abstractions, empty scaffolding, or premature distributed infrastructure.

## Implement in verified vertical slices

1. Define a practical plan: the workflow, owning modules, necessary schema/contracts, dependencies, checks, and observable acceptance criteria for each slice.
2. Build only the foundations needed by the first slice. Connect input and UI, validation, authorization, domain behavior, persistence or external integration, and response state where those concerns apply. A CLI or static tool need not acquire a backend solely to satisfy this outline.
3. Verify that slice before expanding. Include meaningful success, rejected-input, permission, and recovery cases where relevant. Integrate real dependencies as each workflow needs them rather than postponing integration until all screens are built.
4. Complete the remaining in-scope workflows in dependency order. Reuse existing code and deliberate public APIs; keep shared packages independent of applications and dependencies acyclic.
5. Preserve behavior during migrations and restructuring. Use reproducible database changes where needed; do not equate authoring a migration with applying or verifying it in a hosted environment.
6. Clean up artifacts made obsolete by this implementation. Do not expand into unrelated dead-code removal, dependency upgrades, or repository-wide refactoring.

Implement functional behavior, loading and error states, runtime validation, and authorization where required. Use the project's language and tooling; preserve strict TypeScript checks when applicable. Add tests that demonstrate behavior or protect meaningful boundaries, not tests that merely restate implementation details.

For an implementation request, continue beyond folder structure and architecture documents until the defined scope is implemented and appropriately verified, or a concrete blocker prevents further progress. Do not invent credentials, hide missing integrations behind production-looking placeholders, or claim unavailable services were exercised.

## Verify and report honestly

Run checks appropriate to the changed workflows: focused tests, contract and integration checks, typecheck, lint, build, and adapted architecture checks as applicable. Separate existing failures from regressions. Exercise relevant UI/device and deployed behavior when those environments are available and within scope.

A starter import checker, source review, or passing unit tests alone does not prove production correctness, security, or scalability. A production release goal needs explicit acceptance criteria and representative evidence; do not declare it production-ready solely because the build passes.

At meaningful milestones, summarize what changed, the resulting behavior, checks and evidence, remaining acceptance criteria, and material blockers. In the final handoff, distinguish implemented and verified work from incomplete or unverified work, and name the next action for any blocked integration.

## Supporting delivery criteria

Use [feature delivery and evolution](../references/feature-delivery.md) for the Definition of Done and significant decision records. Record decisions using [ADR.md](ADR.md) or the existing project format; do not require an ADR for routine local choices. For affected risks consult [security and data lifecycle](../references/security-checklist.md); for a release consult [deployment readiness](../references/deployment-readiness.md). Keep checks proportional, record measurable requirements and owners, and preserve decision history when a new choice supersedes an accepted one.
