# Example: Multi-App Platform

## Requirements

A platform has: - customer mobile app; - provider mobile app; -
operations web app; - shared backend; - shared visual identity; - shared
validated API contracts.

## Appropriate architecture

``` text
apps/
├── customer-mobile/
├── provider-mobile/
└── operations-web/

packages/
├── design-tokens/
├── mobile-ui/
├── web-ui/
└── contracts/

backend/
├── migrations/
├── functions/
└── tests/
```

Each application owns its routes and product features.

Mobile applications may share generic native primitives, but must not
import screens from one another.

The operations web app uses web-specific primitives.

Design tokens provide visual consistency without pretending web and
native components are the same abstraction.

Contracts become shared only because several clients cross the same
trusted backend boundary.
