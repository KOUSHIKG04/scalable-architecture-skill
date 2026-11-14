# Frontend Architecture

Use for a screen, form, interaction, or frontend architecture decision. Inspect existing routing, components, styling, and data libraries first. Preserve the requested visual design and existing behavior. Apply only affected concerns; a focused UI change does not require reorganizing the application.

## Ownership and rendering

Routes own navigation and composition; the feature owns its screen, components, form behavior, and data interactions. Promote UI to app-shared code for real unrelated consumers, and to workspace-shared code for real applications that need it. Reuse installed primitives and design tokens before introducing competing systems.

Split components for coherent responsibilities, lifecycles, reuse, or test boundaries, rather than file length alone. Compose cross-feature workflows through deliberate entry points instead of importing internal modules.

In server-rendered apps, distinguish server work from browser interaction. Keep privileged modules and data out of client imports and serialized props. Use framework enforcement for server/client boundaries and hydration; a filename alone does not enforce them. Avoid client-rendering a whole page for one interactive control. Native runtimes have different lifecycle constraints.

## State ownership

| State | Typical owner | Explicit decision |
| --- | --- | --- |
| Fetched records | Existing loader or query cache | Freshness, reconciliation, revalidation |
| Shareable filters/sort/page | URL/navigation where supported | Back/forward and invalid parameters |
| Dialog, tab, focus | Nearest responsible component | Whether other components need it |
| Form values/errors | Owning form | Preservation after failure/navigation |
| Durable drafts/offline work | Explicit persistence owner | Expiry, migration, sync, account change |
| Session | Existing auth integration | Expiry recovery and user-state cleanup |

Do not add duplicate fetching for data a loader already owns or mirror records into a global store for convenience. Scope user-specific caches and drafts to identity and resource scope. Cancel or ignore late responses so logout or account switching cannot restore another user's data.

## Forms and asynchronous behavior

- Client validation improves feedback; trusted validation and permissions remain authoritative. Associate safe server field errors with inputs and preserve values on recoverable failures.
- Distinguish initial loading, empty success, background refresh, pending mutation, failure, and session expiry where applicable. A failed request is not an empty list; refresh should not unnecessarily erase usable content or edits.
- Decide how concurrent searches, navigation, and submits behave. Ignore obsolete responses and clean up listeners/subscriptions. Prevent repeated clicks without mistaking button state for backend idempotency.
- Use optimistic updates only when predictable and recoverable; define rollback and authoritative reconciliation. Confirm success only when the trusted operation confirms the promised result.
- Connection loss can leave mutation outcome unknown. Use the [integration guide](frontend-backend-integration.md) before offering a retry.

## Interaction and performance

Use semantic controls or platform accessibility primitives, labels, keyboard actions, visible focus, associated errors, and status announcements as needed. Verify dialog focus entry, containment where appropriate, dismissal, and return. Avoid hover-only actions and color-only meaning. Respect reduced-motion preferences for nonessential motion.

Choose layout from actual content: narrow widths, long labels, large text, localization, errors, and empty/full data. Preserve hierarchy and reading order. Exercise affected touch, safe-area, and keyboard behavior in the native runtime; browser previews do not establish native behavior.

Measure performance against the reported problem and agreed targets. Inspect JavaScript, images/fonts, repeated requests, expensive renders, and large lists. Add memoization, virtualization, caching, or lazy loading when evidence justifies it; do not blanket-memoize or add a state library for an unmeasured issue.

## Review and verification

- [ ] Feature, rendering, and state ownership are clear.
- [ ] Applicable loading, empty, invalid, denied, pending, failure, retry, and success states work.
- [ ] Cleanup, navigation, session changes, and obsolete responses preserve correct state.
- [ ] Relevant keyboard, accessibility, viewport, and content cases are exercised.
- [ ] Visual changes are inspected against the requested design in browser/device.
- [ ] Performance claims include environment, measurement, and before/after evidence.

Use behavior tests for consequential transitions, integration tests for data interactions, and browser/device checks for layout. Automated accessibility tools complement manual keyboard and assistive-technology checks. Screenshots and lint do not prove accessibility. Record unexecuted checks with the [feature delivery criteria](feature-delivery.md#definition-of-done).
