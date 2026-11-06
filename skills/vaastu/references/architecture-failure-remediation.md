# Architecture failure prevention and remediation

Use the relevant sections when designing a feature or repairing an architecture problem. The 14 decisions are review lenses, not 14 mandatory layers or a demand to restructure every project.

## Apply this guide

- Inspect the actual import, request, state, or data flow before diagnosing a failure. A large file, a single application, or a flat directory alone does not prove a boundary problem.
- For an affected decision, identify evidence, the smallest justified repair, behavior to preserve, and the check that could demonstrate success. Use existing project tooling where suitable.
- Make changes within the current task's authorization. Analysis-only requests produce recommendations. Unknown ownership, contracts, permissions, or data-migration requirements remain explicit; do not guess or replace them with blanket rules.
- Prefer one connected repair over a repository-wide rewrite. Preserve routes, contracts, persisted data, permissions, subscriptions and lifecycle cleanup. Use the existing migration/recovery process for data changes.
- Report confirmed findings separately from leads needing validation. Record what changed and which checks passed, failed, or were not run. Stop a repair when its acceptance criteria pass; report remaining blockers rather than retrying mutations indefinitely.

## 1. System Boundaries

- **Detect:** Trace a representative request. Identify routes that mix transport parsing, unrelated workflows, persistence, and response formatting so that a change affects responsibilities with different owners or trust boundaries.
- **Prevent:** Give each justified responsibility an owner. Keep transport adapters thin; a single application or deployment can still have clear internal boundaries.
- **Fix:** Extract the affected workflow into its owning feature or application operation, retaining its public route and contract. Split deployment units only when isolation, workload, or ownership requires it.
- **Verify:** Exercise the original route's accepted input, rejected input and failure response. Check that consumers use the public entry point and that the repair preserves behavior.

## 2. Runtime Isolation

- **Detect:** Inspect imports reachable from browser, Edge, Node, native or worker entry points, including transitive dependencies. Look for unavailable APIs, native binaries or privileged configuration crossing the runtime boundary.
- **Prevent:** Declare runtime ownership and keep compatible public entry points separate. Apply the framework's server/client guards and import restrictions where supported.
- **Fix:** Move the incompatible operation into an appropriate runtime and expose an authorized contract, or choose a compatible implementation. Do not move secrets into browser code to make a build pass.
- **Verify:** Build every affected target and exercise the operation in its actual runtime. Check browser output for privileged modules or secrets; a Node-only unit test does not establish Edge or native compatibility.

## 3. Feature Ownership

- **Detect:** Find a workflow whose components, queries and operations have conflicting owners, or consumers that bypass a feature's public entry point and depend on its internal implementation. File count alone is not a finding.
- **Prevent:** Keep workflow-specific behavior with its feature and expose only the contracts that other consumers need.
- **Fix:** Move the affected responsibility to its owner, update consumers and retain compatibility exports when a staged migration needs them. Avoid reorganizing unrelated folders.
- **Verify:** Resolve imports and run the owning workflow's checks. Confirm that consumers use the intended entry point and that moves preserve state, subscriptions and cleanup.

## 4. Database & Schemas

- **Detect:** Trace database access and migration ownership. Look for browser-accessible credentials, duplicated pool creation, conflicting schema definitions or persistence logic outside its trusted owner.
- **Prevent:** Keep schema changes reproducible and persistence access in the trusted owning feature or data-access boundary. An extra repository abstraction is optional, not an automatic requirement.
- **Fix:** Consolidate the affected connection/configuration and move misplaced persistence calls behind the existing trusted contract. Use reviewed migrations and an explicit data-preservation plan for schema changes.
- **Verify:** Test applicable constraints, tenant/resource isolation, transaction behavior and migration compatibility in an appropriate environment. Source review does not prove hosted permissions or migration safety.

## 5. State Ownership

- **Detect:** Follow one entity from read to mutation to refresh. Identify duplicate authoritative copies, missing invalidation, state leaking across users, or URL/draft state that resets unexpectedly.
- **Prevent:** Assign ownership separately to server data, query cache, URL state, local interaction state and durable drafts. Use the project's existing cache before introducing another store.
- **Fix:** Remove the duplicate owner, derive display state where possible, and connect mutation/invalidation and identity changes to the authoritative owner. Preserve unsaved drafts during the transition.
- **Verify:** Exercise mutation, navigation, reload and account/tenant changes. Include optimistic-update failure recovery when used, and check that the correct data appears without stale cross-user state.

## 6. Dependency Rules

- **Detect:** Resolve actual imports, aliases, re-exports and dynamic imports for the affected code. Identify cycles or edges forbidden by the project's chosen ownership rules.
- **Prevent:** Express the approved allowed dependencies in lint, package exports or a resolver-aware dependency check. Public feature collaboration can be valid; importing another feature's internals is a separate concern.
- **Fix:** Break the offending edge by moving misplaced ownership, using a public contract, or moving genuinely shared domain contracts downward. Avoid a new generic shared package merely to hide a cycle.
- **Verify:** Run the applicable dependency/cycle check, builds and affected behavior tests. The bundled boundary starter checks only limited import patterns; passing it alone does not prove alias resolution, cycle freedom or all feature boundaries.

## 7. Shared Code Strategy

- **Detect:** Inspect shared utilities with feature-specific business rules, mutually incompatible consumers, or dependencies back into an application. Similar-looking code does not necessarily have the same responsibility.
- **Prevent:** Share stable responsibilities with real consumers and deliberate public APIs. Keep domain-specific policies with their owner.
- **Fix:** Return misplaced behavior to its feature; extract a smaller shared contract only when consumers need the same semantics. Migrate callers incrementally rather than changing every helper at once.
- **Verify:** Check all affected consumers and their builds. Confirm that shared code has no forbidden dependency on application source and retains each consumer's required behavior.

## 8. Authentication & Authz

- **Detect:** Follow identity and resource scope from the trusted entry point to the operation and persistence boundary. Look for client-only checks, unverified identity or missing ownership/tenant enforcement.
- **Prevent:** Define who may perform each operation on which resource. Enforce those rules on the trusted backend and at the data boundary where applicable; navigation visibility is not authorization.
- **Fix:** Apply the owning authorization policy consistently and close the actual bypass. Preserve intended roles and access; do not invent permissions or trust an identity supplied by the client.
- **Verify:** In an authorized test environment, exercise unauthenticated, expired, wrong-role, wrong-owner and cross-tenant cases as applicable, plus legitimate access. Confirm rejected writes leave data unchanged. Local tests do not prove deployed identity or database configuration.

## 9. Error Handling

- **Detect:** Trace validation, domain, network and integration failures to both caller response and logs. Look for swallowed errors, unhandled asynchronous failures, exposed internals or a UI that reports success after failure.
- **Prevent:** Define stable error contracts and separate public recovery messages from restricted diagnostic detail. Give retry behavior explicit limits and idempotency rules where side effects require them.
- **Fix:** Catch failures at the owning boundary, map them to the existing contract and restore consistent UI/data state. Redact sensitive diagnostics without removing the information needed to investigate.
- **Verify:** Inject representative failure cases. Check response mapping, visible recovery, log redaction, rollback or reconciliation, and bounded retries without duplicate side effects.

## 10. Scalability Triggers

- **Detect:** Compare measured latency, throughput, queue depth, pool use or other relevant signals with documented requirements. Separate an observed bottleneck from a hypothetical future workload.
- **Prevent:** Record relevant thresholds, measurement source and revisit conditions. Keep workload expectations and unknown targets explicit.
- **Fix:** Address the demonstrated bottleneck with the smallest effective change, such as query work, pooling or concurrency limits. Add caches, queues, replicas or services only when measurements justify their consistency and operational costs.
- **Verify:** Compare before/after behavior under a representative, authorized workload and relevant failure conditions. Report the environment and limits; do not fabricate production thresholds or run unapproved load against a live system.

## 11. First Vertical Slice

- **Detect:** Attempt one promised user outcome through its real boundaries. Identify placeholder success, disconnected screens, missing contracts or integrations that stop the workflow from completing.
- **Prevent:** Select one useful acceptance case and connect its applicable UI, operation, permissions, persistence and response path before expanding many similar features.
- **Fix:** Complete the missing connection using the existing owners. Where an integration is unavailable, retain a clearly labeled adapter or test substitute and report the gap instead of treating it as a live result.
- **Verify:** Exercise the full outcome, its important rejection/failure case and persistence where required. A browser-local feature does not need a backend or database simply to qualify as a slice.

## 12. Implementation Order

- **Detect:** Compare the task plan with actual dependencies. Look for code assuming undecided contracts, data changes without migration planning, or consumers built against incompatible producer behavior.
- **Prevent:** Order work by dependency and risk. Resolve the affected contracts and data ownership before binding consumers to them; exploratory UI work can still clarify requirements.
- **Fix:** Replan the remaining work around one dependency-ready slice. Stabilize the missing contract and update affected producers/consumers while preserving compatibility where needed.
- **Verify:** Run the checks for each completed slice and confirm affected consumers still work. For rollout-sensitive changes, verify old/new contract or schema compatibility in the intended release order.

## 13. Contract Validation

- **Detect:** Locate untrusted input crossing HTTP, webhook, job, storage or third-party boundaries. Distinguish TypeScript assertions from actual runtime parsing and check where validated values are consumed.
- **Prevent:** Define accepted shape, size and domain constraints at the trusted boundary using appropriate existing tooling. Runtime shape validation complements authorization and business invariants; it does not replace them.
- **Fix:** Parse before side effects, reject invalid input with the established error contract, and ensure the operation uses the parsed result. Treat malformed integration responses explicitly instead of assuming success.
- **Verify:** Cover valid, missing, malformed, oversized and relevant domain-invalid values. Confirm invalid input cannot trigger partial writes, authorization bypasses or uncontrolled internal errors.

## 14. Testing Boundaries

- **Detect:** Identify the real behavior and boundary each test exercises. Look for tests that replace the operation under test, skip persistence/permissions, or pass despite a broken consumer contract.
- **Prevent:** Match tests to meaningful risks: domain rules, public contracts, trusted integrations and a small set of connected user workflows. Use controlled substitutes for unavailable services and label what they cannot establish.
- **Fix:** Replace misleading assertions or excessive mocking with checks at the affected real boundary. Resolve race conditions with observable state and proper isolation rather than arbitrary sleeps or disabling failures.
- **Verify:** Demonstrate that a representative broken contract or behavior makes the focused check fail, then restore the repair and confirm it passes. Recheck affected integrations; coverage percentages or a mocked green run alone do not establish end-to-end correctness.

## Record the result

Keep the report proportional to the task. For each relevant decision, record the evidence, prevention or repair performed, preservation constraints, verification results and remaining limits. Mark a decision not applicable when justified instead of adding architecture to satisfy this list. These instructions guide an agent; automated enforcement exists only where a real project check has been implemented and run.
