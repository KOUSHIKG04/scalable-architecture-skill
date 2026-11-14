# Backend Architecture

Use for trusted operations, APIs, persistence, integrations, and jobs. This applies to an in-app server, standalone API, managed backend operation, or worker. It does not require separate deployment. Preserve existing runtime conventions unless requirements justify changing them.

## Operation ownership

Identify actor, resource, invariant, data owner, execution time, failure behavior, and external dependencies. Choose the smallest trusted execution path that enforces them.

| Responsibility | Owns | When to separate |
| --- | --- | --- |
| Transport adapter | Parsing, verified identity acquisition, invocation, response mapping | Keep framework behavior outside reusable rules |
| Feature operation | Authorization, workflow coordination, invariants | A coherent operation often suffices for a small feature |
| Domain rule | State transitions/calculations | Complexity or reuse benefits from independent tests |
| Persistence access | Scoped queries, writes, transaction participation | Actual reuse or query complexity |
| Integration adapter | Provider protocol, timeouts, response validation, error translation | Isolate provider behavior from domain decisions |

These are responsibilities, not mandatory files/interfaces. A small feature can keep operations and queries together. Lower layers must not import routes. Do not create a repository for every table or a separately deployed service for every feature.

## Trusted inputs and access

Validate runtime shape and bounds. Obtain identity from verified server-side authentication. Submitted actor, tenant, role, price, or owner values are not proof of authority. Authorize client-selected resource scope against the verified actor.

Scope reads as well as writes in the data operation rather than UI filtering. Explicitly select permitted update fields; passing a whole request to an ORM can modify protected properties. Domain rules remain authoritative even when the client validates them.

Expose stable outcomes without leaking database exceptions, credentials, or sensitive existence details. Distinguish validation, access, missing-resource, conflict, and transient failures using project conventions. Use the [security checklist](security-checklist.md) for affected misuse cases and evidence.

## Persistence, concurrency, and retries

Identify writes that must succeed/fail together. Enforce them through supported transactions, constraints, or conditional writes. A read followed by a write is not concurrency-safe merely because both occur in one function. Choose isolation, locking, uniqueness, or version checks from the actual race and database semantics.

When duplicate execution matters, define an idempotency key scoped to actor/resource and operation, a payload fingerprint, atomic reservation/result storage, concurrent-request behavior, and retention covering the supported retry window. Matching key/payload recovers the original result; another payload conflicts. An in-memory map does not cover restarts or multiple instances.

Keep transactions short. External calls generally cannot roll back with database writes. For promised durable external work, choose an atomic handoff such as a transactional outbox or explicit reconciliation/compensation. A crash between commit and publication must not lose promised work. Optional best-effort notifications do not automatically justify this machinery.

Use reproducible migrations. Plan running-client compatibility, backfills, and recovery where affected. Choose query shape, pagination, constraints, and indexes from real access patterns. Verify on the real engine in an isolated environment; mocked queries cannot prove constraints, concurrency, or permissions.

## Integrations and jobs

Define timeouts and bounded retries for external calls. Retry only failures allowed by operation/provider semantics, use backoff, and avoid multiplying retries across client, API, and worker layers. Validate important provider responses and translate failures.

Authenticate webhooks using the provider's documented mechanism before trusting events. Deduplicate where needed and handle delayed/out-of-order events with domain state rules. Event IDs alone are not authentication.

Introduce jobs for independent execution, latency, or recovery requirements. Define delivery/acknowledgement semantics, idempotent processing, authorization context, retry limits, failed-job handling, and ownership. Do not assume exactly-once execution. Recheck current permissions for delayed user actions when policy requires it; role snapshots must not accidentally preserve revoked access.

## Operations and verification

Reuse configuration validation, secret storage, logs, and health reporting. Trace important failures across requests/jobs/providers without unnecessary private data. Distinguish process liveness from readiness for required dependencies. Select limits and telemetry from workload/risk rather than invented universal targets. Use [deployment readiness](deployment-readiness.md) for release and recovery evidence.

- [ ] Direct requests reject invalid input, protected-field edits, expired/missing identity, and unauthorized scope.
- [ ] Domain rules hold and outcomes are stable and sanitized.
- [ ] Partial failures and concurrency preserve invariants.
- [ ] Duplicate mutations/events follow the retry contract.
- [ ] Timeouts/job failures have bounded, observable recovery.
- [ ] Applicable migrations, queries, constraints, and permissions are exercised on representative persistence.

Use unit tests for complex rules, integration tests for request/persistence behavior, and database/worker tests for atomicity and retries. Record limits: source review, mocks, local execution, hosted settings, and production acceptance establish different things. See the [create-order example](../examples/create-order.md).
