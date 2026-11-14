# Worked Example: Create an Order

This is an illustrative design, not a built/tested application. Adapt choices to actual requirements. Consult [frontend](../references/frontend-architecture.md), [backend](../references/backend-architecture.md), and [integration](../references/frontend-backend-integration.md) guidance as relevant.

## Requirements and small-app boundaries

Authenticated customers create orders in organizations they belong to and view their own orders there. Items have positive integer quantities. The server determines prices and persists price snapshots. Repeating a submission after response loss must not create a duplicate.

Assume one existing web app, authentication integration, and transactional database. There is no inventory reservation, payment, offline queue, email guarantee, or separate operations app. Those requirements would change the design.

Keep the form, portable contract, client data interaction, trusted operation, and scoped queries with their owning feature under existing conventions. The framework route adapts requests; framework enforcement prevents client imports of server-only modules. Responsibilities need not map one-to-one to files. A controller/service/repository hierarchy or shared package is not required.

## Contract

Example transport: POST /orders with a client-generated idempotency key. Input contains organization ID and item ID/quantity pairs. Verify session identity and membership server-side. Do not accept authoritative customer identity, role, price, or total from the client.

Choose item/quantity limits from product requirements. Reject duplicate item IDs or normalize them by an explicit policy. Load eligible catalog items in authorized scope and calculate exact totals using established money representation.

Return order ID, status, authoritative lines/prices, currency, total, and timestamp in documented serialized forms. Success means order and lines committed, with no payment/fulfillment promise.

Recognized errors cover invalid fields, unauthenticated, inaccessible organization, unavailable item, and key/payload conflict. Map to existing HTTP/error conventions without database detail. Matching retries return the original result even if catalog prices or availability later change.

## Connected flow

1. The form owns values and immediate validation; its query owner holds catalog data. Displayed prices are estimates until confirmation.
2. Freeze the submitted payload and retain its key through an unknown outcome. Preserve values while pending or after recoverable failure.
3. The route verifies identity, parses input, and invokes the feature operation.
4. Authorize membership and order access. Before catalog-dependent checks, return a completed authorized replay when its fingerprint matches. For a new attempt validate catalog items and domain rules.
5. Atomically reserve the scoped key, bind its fingerprint, create order/lines, and store the result. Use database uniqueness and transaction semantics to arbitrate concurrent requests; application check-then-insert is insufficient. Recheck replay/conflict under arbitration. Concurrent matching attempts wait or receive the documented recoverable pending outcome; different payloads conflict.
6. Commit and return authoritative data. Failure before commit leaves no partial order or permanently reserved key.
7. Reconcile detail and affected lists/counts through the established query/loader owner and show confirmed success.
8. After response loss, retry the frozen payload with the same key while still authorized. Recover the original result rather than recomputing it. Retain keys for the supported retry window; afterward reconcile through authorized lookup rather than blindly resubmit.

A changed form requires a new key, but resolve an unknown earlier attempt first to avoid duplicate intent. Account/organization switches must isolate pending attempts and caches. Never replay another actor's submission under a new session. Later order retrieval remains customer/organization-scoped.

## Acceptance matrix

| Scenario | Expected observation | Evidence |
| --- | --- | --- |
| Valid submit | One committed order, authoritative total, matching UI | Connected browser-to-database flow |
| Invalid quantity/protected fields | Invalid quantity rejected; protected fields rejected or ignored by explicit contract; no unauthorized values persist | Direct adapter integration |
| Unauthorized organization/another customer's order | Read/write denied without disclosure | Real permission tests with synthetic actors |
| Concurrent matching retries | One order; same result or documented pending outcome | Parallel requests on real persistence |
| Same key, different payload | Conflict; original unchanged | Adapter/database integration |
| Failure during line creation | No partial order or orphaned reserved key | Controlled transaction failure |
| Commit followed by response loss | Same-key recovery returns original order | Integration fault simulation and UI recovery |
| Catalog changes before replay | Original result without revalidating old prices/availability | Adapter/database integration |
| Session switch during request | Old response cannot populate new user's state | Client lifecycle test |
| Narrow viewport, keyboard, server field error | Usable form, visible focus, associated errors, retained values | Browser interaction and visual inspection |

Use available project mechanisms and record environment, results, and unrun cases with the [Definition of Done](../references/feature-delivery.md#definition-of-done). Mocked persistence does not prove atomicity; API tests do not prove layout/accessibility. Hosted permissions and release behavior need separate evidence.

## Growing system

When mobile and operations clients become requirements, keep screens and session integration app-owned. Share portable contracts for real consumers; keep trusted order operations backend-owned. Operations status changes need their own authorization and transition rules.

Do not import web source from mobile or expose server modules through shared barrels. Check supported older clients. Add inventory locking, payments, queues, or an outbox only when required; define durable handoff/recovery before promising external work. Growth changes specific boundaries rather than every folder.
