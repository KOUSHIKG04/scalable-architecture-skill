# Feature: Name

Use for substantial features when a durable specification helps. For a small change, put the relevant acceptance and verification details in the existing issue or handoff instead of creating this file.

## Outcome and scope

- User outcome and owning application/feature:
- In scope / out of scope:
- Existing behavior, routes, permissions and state to preserve:
- Dependencies and related decisions:

## Acceptance criteria

State observable success, invalid-input, denied-access, failure/recovery and applicable measurable non-functional expectations. Mark unknown requirements explicitly; do not fabricate targets.

## Contract and workflow

Inputs/outputs, validation, errors, identity and resource/tenant scope, state ownership, integrations, authoritative data, persistence/migrations, transaction and retry boundaries. Omit layers the feature does not use.

## Client and trusted-operation behavior

For affected boundaries, capture form/query ownership, loading/empty/pending/error states, accessibility/responsive acceptance, and mutation reconciliation. Define authoritative server fields, stable errors, permissions, concurrency, retry/unknown-outcome behavior, and supported-client compatibility. Omit concerns the feature does not use.

Use the [frontend](../references/frontend-architecture.md), [backend](../references/backend-architecture.md), and [integration](../references/frontend-backend-integration.md) guides as relevant; do not repeat their contents.

## Implementation slices

Dependency-ordered slices, necessary foundations, ownership and integration points. The first slice must prove one real user outcome.

## Security and data lifecycle

Relevant misuse cases, permissions, secret handling, sensitive collection/retention/deletion, and audit events. Use the [security checklist](../references/security-checklist.md) for affected risks.

## Release and operations

Applicable CI, configuration, compatibility/migration, rollback/roll-forward, failure visibility, incident owner and recovery expectations. Use [deployment readiness](../references/deployment-readiness.md) when this work targets a release.

## Definition of Done and evidence

Use the [feature delivery criteria](../references/feature-delivery.md#definition-of-done). Record acceptance criterion, check, source revision/environment, result (passed / failed / not run / not applicable), evidence, limitation and next action. Distinguish implementation from verified behavior and release readiness. Do not mark required unexecuted checks complete.
