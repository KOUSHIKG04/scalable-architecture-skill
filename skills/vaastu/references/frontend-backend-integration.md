# Frontend-Backend Integration

Use for client/trusted-operation boundaries: HTTP, server actions, RPC, and constrained managed data APIs. Keep the established transport unless requirements justify a change. Frontend-only interactions do not need a new API.

## Observable contract

Specify the affected operation's:

- Request fields, bounds, optional/nullable meanings, and identity/resource scope sources.
- Response fields, authoritative values, and completion meaning: accepted, persisted, or downstream work finished.
- Stable errors and safe field messages, consistent with transport status.
- Retry/idempotency, timeout/unknown-outcome, and concurrent-update behavior.
- List filters, deterministic ordering with a tie-breaker, pagination/limits, and invalid/expired cursor behavior where relevant.

Keep transport DTOs deliberate; database rows and ORM objects are not automatically public contracts. Define serialization for dates, precise amounts, large integers, and absent values. TypeScript interfaces do not validate runtime payloads. Validate untrusted inputs at trusted boundaries, and integration responses where malformed data violates assumptions.

Share portable schemas/generated clients for real consumers; a single app can keep its contract feature-local. Contracts must not import database connections, server secrets, framework session objects, or application source. Generated clients do not replace authorization or runtime compatibility.

## Map outcomes into UI behavior

| Outcome | Trusted operation | Client |
| --- | --- | --- |
| Invalid fields | Safe recognized field errors | Associate with inputs; preserve values |
| Expired session | Authentication failure | Existing recovery; preserve draft where appropriate |
| Denied/inaccessible resource | Enforce scope and safe disclosure policy | Permitted recovery without private details |
| Conflict | Reject stale/invalid transition | Reconcile and explain next action |
| Transient failure | Bounded retry path if safe | Preserve work; avoid loops |
| Connection lost after submit | Outcome may be unknown | Recover through key/status contract before another mutation |
| Confirmed success | Authoritative result | Reconcile affected caches or revalidate owning loader |

Do not show raw exceptions or label unknown outcomes as definite failure/success. Repeated-click prevention does not guarantee backend idempotency.

## Consistency and evolution

Name fetched-state ownership and mutation effects. Reconcile affected detail, list, and aggregate data through existing conventions. Decide whether mutations reset pagination, preserve filters, or remove records from visible results.

Scope personalized client and server response caches by identity and authorized resource context. Clear or isolate queries, drafts, optimistic updates, and in-flight responses on logout/account/tenant changes. For conflicting edits use a version/precondition or explicit domain policy rather than assuming last-write-wins.

Identify real consumers, including older mobile apps, workers, and external callers. Added enum values and changed errors can break exhaustive client handling. Stage incompatible changes or version contracts as needed and coordinate application/database rollout. Updating a shared package does not update already-running clients.

## Boundary verification

- Exercise the real adapter with valid, malformed, denied, conflict, and applicable serialization/list boundary cases.
- Verify client error mapping, expiry, stale responses, and recovery. Test doubles must expose failures and implement the real contract.
- Where duplicates matter, simulate commit followed by response loss and exercise concurrent/replayed requests.
- Exercise a connected client-to-persistence flow. Record mocked UI, API integration, and connected results separately.
- Check supported older consumers when changing contracts; record required unrun cases in [feature acceptance evidence](feature-delivery.md#definition-of-done).

See [frontend architecture](frontend-architecture.md), [backend architecture](backend-architecture.md), and [create order](../examples/create-order.md).
