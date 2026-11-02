# Architecture Principles

## Requirements Before Structure
Identify users, workflows, trust boundaries, data ownership, runtime boundaries, deployment constraints, team constraints, and expected scale before choosing architecture.

## Ownership Before Reuse
Keep behavior local until a real reuse case shows that the responsibility belongs at a broader boundary.

```text
Feature-local → Application-shared → Workspace-shared
```

## Thin Edges, Strong Capabilities
Routes, controllers, screens, and transport adapters connect the outside world to an owning capability. Keep business behavior inside that capability.

## Evolution Over Prediction
Design boundaries that permit change without implementing hypothetical complexity.

## Security Is Architecture
Authentication, authorization, ownership, privileged credentials, auditability, and sensitive logging belong in architectural decisions.

## State Has Ownership
URL state, local UI state, server/query state, cross-feature client state, and persistent database state solve different problems. Avoid competing sources of truth.
