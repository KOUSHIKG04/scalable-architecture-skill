# Architecture Proposal

## 1. Requirement Interpretation

Summarize users, workflows, constraints, scale, and assumptions.

## 2. Architecture Decisions

For each important decision:

  Decision   Requirement   Choice   Alternatives   Why   Revisit when
  ---------- ------------- -------- -------------- ----- --------------
                                                         

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

The first implementation should prove one complete vertical slice.
