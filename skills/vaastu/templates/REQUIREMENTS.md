# Project Requirements

## 1. Product

**Name:**\
**Purpose:**\
**Primary problem:**\
**MVP goal:**

## 2. Users / Actors

  Actor   Main goals   Client/platform   Important permissions
  ------- ------------ ----------------- -----------------------
                                         

## 3. Core Workflows

1.  
2.  
3.  

## 4. Applications / Clients

List known clients only. Do not decide architecture here unless the
product already requires a distinct runtime.

-   Web:
-   Mobile:
-   Admin/operations:
-   Public API:
-   Other:

## 5. Functional Requirements

### Must have

-   

### Later

-   

## 6. Data

Important entities/concepts:

-   

Important relationships:

-   

## 7. Authentication

-   Authentication methods:
-   Session requirements:
-   Anonymous access:

## 8. Authorization

-   Roles/capabilities:
-   Tenant/organization/resource scope:
-   Sensitive operations:

## 9. External Integrations

  Integration   Purpose   Required for MVP?
  ------------- --------- -------------------
                          

## 10. Realtime

What must update in realtime, if anything?

## 11. Background Processing

What work may need queues/jobs/schedules, if anything?

## 12. Files / Storage

-   

## 13. Non-Functional Requirements

Use measurable expectations for relevant concerns. Record the target, workload/environment, verification method and source/owner; leave unknown targets explicit instead of making up numbers. Mark irrelevant concerns with a reason. These requirements inform architecture choices and release acceptance, not a fixed infrastructure checklist.

| Concern | Target / constraint | Workload or environment | Verification / evidence | Source / owner |
| --- | --- | --- | --- | --- |
| Expected users, concurrency and data volume | | | | |
| Important workflow latency and throughput | | | | |
| Availability and dependency failure behavior | | | | |
| Security, permissions and tenant isolation | | | | |
| Privacy, retention and deletion | | | | |
| Supported platforms and accessibility | | | | |
| Offline/realtime behavior, if needed | | | | |
| Hosting, delivery and operating budget | | | | |
| Failure visibility and operational ownership | | | | |
| Recovery time and acceptable data loss | | | | |

Define recovery time objective (acceptable time to restore service) and recovery point objective (acceptable data-loss window) where data/service recovery matters. Distinguish user expectations, verified measurements and assumptions. Identify applicable compliance obligations with the responsible owner; this template does not establish compliance.

## 14. Technology Constraints

-   Language:
-   Web:
-   Mobile:
-   Backend:
-   Database:
-   Deployment:
-   Required libraries/services:

## 15. Team / Delivery Constraints

-   Team size:
-   Timeline:
-   Environments:
-   CI/CD and required checks:
-   Release/configuration owner:
-   Migration and recovery responsibilities:
-   Incident ownership and investigation path:

## 16. Open Questions

-   
