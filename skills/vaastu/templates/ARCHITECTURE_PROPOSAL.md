# Architecture Proposal

## 1. Requirement Interpretation

Summarize users, workflows, constraints, scale, assumptions and measurable non-functional acceptance criteria. Link to targets, their source/owner and how they will be verified; keep unknowns visible.

## 2. Architecture Decisions

For each architecturally significant decision, record the requirement, alternatives, rationale, consequences and revisit conditions in an ADR or the project's existing decision log. Use [ADR.md](ADR.md) when no format exists.

| Decision | Type | Requirement / evidence | Choice and alternatives | Consequences | Revisit when | Decision record / status |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

Structural, security, major data and independently operated infrastructure choices usually warrant a record. Routine local implementation and behavior-preserving cleanup usually do not. Documentation depth does not create an approval gate: follow the current request's authorization and clarify material departures. Do not invent review outcomes.

## 3. System Architecture

``` text
<diagram>
```

## 4. Application & Deployment Boundaries

  ------------------------------------------------------------------------------
  Unit           Responsibility   Runtime        Deploys          Why separate?
                                                 independently?   
  -------------- ---------------- -------------- ---------------- --------------
                                                                  

  ------------------------------------------------------------------------------

## 5. Repository Architecture

``` text
<tree>
```

Explain why every top-level directory exists.

## 6. Application Architecture

For each app define: - route/framework boundary; - features; -
app-shared code; - state ownership; - platform integrations.

## 7. Backend Architecture

``` text
Transport
↓
Validation
↓
Authentication / Authorization
↓
Application / Domain
↓
Data Access
↓
Persistence / Integration
```

Document deviations only when justified.

## 8. Database Architecture

Define: - source-of-truth entities; - relationships; - constraints; -
transactions; - indexes; - migrations; - authorization/policies.

## 9. Shared Packages

  ----------------------------------------------------------------------------
  Package        Responsibility   Consumers      Allowed        Why shared?
                                                 dependencies   
  -------------- ---------------- -------------- -------------- --------------
                                                                

  ----------------------------------------------------------------------------

## 10. Dependency Rules

### Allowed

-   

### Forbidden

-   

## 11. Critical Data / Request Flows

### Flow A

``` text
Client
↓
...
↓
Database
```

## 12. Authentication & Authorization

-   

## 13. Environment / Configuration

Separate: - public/client configuration; - app-specific configuration; -
server-only secrets.

## 14. State Strategy

-   URL/navigation state:
-   local UI state:
-   server state:
-   cross-feature client state:
-   session state:

## 15. Testing

-   Unit:
-   Integration:
-   Database/policy:
-   E2E:
-   Architecture regression:

## 16. Scalability

### Keep simple now

-   

### Likely pressure points

-   

### Explicit triggers for additional infrastructure

-   

## 17. Guardrails

### MUST

-   

### SHOULD

-   

### MUST NOT

-   

## 18. Initial Implementation Plan

1.  
2.  
3.  

The first implementation should prove one complete vertical slice across the boundaries it actually requires. Define per-feature acceptance and evidence using [feature delivery](../references/feature-delivery.md); use [FEATURE_SPEC.md](FEATURE_SPEC.md) only for substantial features.

## 19. Security, Release and Operational Acceptance

- Affected trust boundaries, misuse cases, permission tests and sensitive-data lifecycle; consult [security verification](../references/security-checklist.md).
- Applicable CI checks and their execution environment; distinguish configured checks from observed passing runs.
- Deployment artifact/configuration, migration compatibility and rollback/roll-forward limitations.
- Failure visibility, important measurements, incident owner and recovery expectations; consult [deployment readiness](../references/deployment-readiness.md).
- Evidence required for feature completion versus release acceptance, with passed/failed/not-run/not-applicable status and reasons.
- Decision review triggers and the process for superseding accepted decisions without erasing history.

Apply this section to the project's risks and delivery stage. Do not require infrastructure or a release procedure the task does not need.
