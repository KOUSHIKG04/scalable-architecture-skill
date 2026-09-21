# Example: Simple SaaS

## Requirements

A web-only SaaS with authentication, organizations, a dashboard, CRUD
records, billing later, and PostgreSQL.

## Appropriate architecture

``` text
apps/
└── web/
    └── src/
        ├── app/
        ├── features/
        │   ├── auth/
        │   ├── organizations/
        │   └── records/
        ├── components/
        └── server/
packages/
└── design-tokens/   # only if a real reusable design layer is wanted
```

A second application, queue, cache, mobile UI package, microservices,
and generic data-access package are not justified yet.

The lesson: the skill does not require a large monorepo. It preserves
ownership while keeping the system small.
