# Example: Realtime Platform Evolution

## Initial requirement

A collaborative product needs accounts, projects, CRUD operations, and
occasional live status updates.

Start with:

``` text
Clients
   ↓
Backend
   ↓
PostgreSQL
```

Use scoped realtime subscriptions only for the workflows requiring them.

## Growth trigger

Later, expensive document processing takes 20--90 seconds and must retry
independently.

Now introduce:

``` text
API
 ↓
Queue
 ↓
Worker
 ↓
Database / Storage
```

The worker is justified because work is slow, retryable, and should not
block request execution.

## Further growth

Only extract an independently deployable service when there is a
demonstrated reason such as independent scaling, runtime isolation,
failure containment, or separate ownership.

The lesson: scalability is evolutionary. Do not deploy the architecture
you might need three years from now.
