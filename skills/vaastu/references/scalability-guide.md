# Scalability Guide

Scalability should be evolutionary rather than speculative.

## Codebase
Use explicit feature ownership, small public APIs, controlled sharing, and acyclic dependencies.

## Applications
Create another application for a real runtime, product, deployment, security, release, or ownership boundary. Applications should not import one another's source.

## Teams
Clear ownership reduces coordination cost. Avoid global modules that every team must edit.

## Infrastructure
Start with the simplest topology satisfying current requirements.

- Add caching for measured read/latency pressure.
- Add queues/workers for asynchronous, retryable, long-running, or isolated work.
- Add realtime infrastructure for genuine realtime needs.
- Partition data when volume/access patterns justify it.
- Extract services when independent operation creates concrete value.

Do not use infrastructure components as symbols of scalability.
