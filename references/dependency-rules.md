# Dependency Rules

## Preferred Direction

```text
Transport / Route
      ↓
Feature / Application Capability
      ↓
Portable Contracts / Domain Concepts
      ↓
Data Access
      ↓
Database / External Systems
```

This is conceptual. Small projects do not need a physical abstraction for every line.

## Usually Avoid
- package → application
- application A → application B source
- feature → route
- feature A → feature B internals
- shared UI → product feature
- portable contracts → UI framework
- data access → UI/navigation framework
- untrusted client → privileged server implementation

## Cycles
Do not hide cycles. Reconsider ownership, extract a smaller neutral capability, or orchestrate from a higher boundary.

## Enforcement
Use lint rules, restricted imports, architecture tests, custom scripts, or CI for meaningful boundaries.
