# Feature Delivery and Architecture Evolution

Use this guide while delivering substantial workflows. For a small fix, apply the relevant checks directly; do not create a feature document or an ADR merely to satisfy this guide. Reuse the project's existing issue, specification, decision log, and delivery conventions.

## Keep the three phases

1. Discovery and proposal: inspect requirements and the repository, justify boundaries and alternatives, identify measurable acceptance criteria, and record significant decisions. A proposal-only request stops at the proposal. Existing implementation authorization remains valid within its scope.
2. Foundation and first slice: create only what the first real workflow needs, connect its required boundaries, and validate behavior and dependencies. A static page or CLI does not need a database or API for the sake of a diagram.
3. Incremental delivery and evolution: complete dependency-ready workflows, verify their contracts and architectural impact, and revisit decisions when evidence changes.

Phase exits describe evidence, not a mandatory meeting or additional permission gate.

## Deliver a feature

- Identify the user outcome, owning application/feature, acceptance criteria, edge cases, and behavior to preserve. Inspect existing code first.
- Define inputs, outputs, validation, errors, permissions and resource scope, state ownership, external dependencies, and any persistence/transaction changes. Use [FEATURE_SPEC.md](../templates/FEATURE_SPEC.md) only when a substantial feature benefits from a durable specification.
- Implement one connected workflow across the layers it actually uses. Integrate required services during the slice, with loading, failure, retry, and response states. Make incomplete integrations explicit.
- Run relevant behavior, contract, permission, integration, architecture, type, lint, and build checks. Use the project's commands and adapters; a starter import scanner is only limited evidence. Run applicable performance checks against the stated workload and target, not an invented universal threshold.
- Check for accidental cross-app imports, dependency cycles, unjustified shared packages, duplicate state, and weakened trust boundaries. Use the [security checklist](security-checklist.md) for the affected risks.
- For a release, assess the applicable [deployment and operational checks](deployment-readiness.md). Local feature completion is not the same as deployment or operational validation.

## Definition of Done

A feature can be called complete for the agreed scope only when its acceptance criteria are met and the relevant checks have evidence:

| Concern | Evidence to record |
| --- | --- |
| Behavior | Required workflow, edge/failure cases, and preserved behavior exercised |
| Contracts and permissions | Invalid input and unauthorized resource access rejected where applicable |
| Data and integration | Constraints, transactions, retries, and required integrations verified where applicable |
| Architecture | Ownership and dependencies checked; significant changed decisions recorded |
| Delivery quality | Appropriate tests/typecheck/lint/build results; existing failures separated |
| Handoff | Relevant documentation updated; limitations and release-specific gaps explicit |

Record each applicable check as passed, failed, or not run, with the environment/revision and evidence. Mark a concern not applicable only with a reason. A required check that fails or cannot run leaves that acceptance criterion unverified; report the blocker instead of silently redefining completion.

Distinguish implementation present, behavior verified in a named environment, deployed, and release/operational acceptance verified. These are different claims; none follows automatically from another.

## Record and revisit significant decisions

Record consequential changes to runtime topology, trust/tenancy, authoritative data ownership, public contracts, or independently operated infrastructure as an ADR or the project's equivalent. Local implementation choices normally need no ADR. Use [ADR.md](../templates/ADR.md) when no existing format applies.

| Decision | Treatment |
| --- | --- |
| Structural, security, major data or infrastructure | Document alternatives, consequences, verification and migration; check whether the requested change is already authorized |
| Local implementation or behavior-preserving cleanup | Use existing conventions; document only consequential trade-offs |

Significance determines documentation and review depth, not automatic approval requirements. Follow the current request's scope; clarify material departures or missing requirements rather than asking again for work already authorized.

Revisit a decision when requirements, measured load, incidents, dependency constraints, or team ownership make its assumptions false. State the evidence and propose the smallest migration. Preserve accepted decision history: create a superseding record, link both records, and mark the old decision superseded instead of rewriting its original rationale. Record review outcomes without inventing reviewers or approvals. Do not extract services based on speculative scale.

Reference: [AWS ADR best practices](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/best-practices.html).
