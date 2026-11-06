# Security and Data Lifecycle Verification

Use the relevant parts when a change affects identity, permissions, sensitive data, untrusted input, or external integration. This guide supports feature acceptance; it is not a comprehensive security audit or evidence of compliance.

## Start from the affected trust boundary

Identify the actor, protected resource, operation, entry point, and trusted enforcement point. Sketch plausible misuse paths proportional to risk: a second tenant requesting a known resource ID, a user changing roles or resource identifiers in a payload, a replayed operation, or an untrusted integration response. Reuse existing threat models; do not require a separate document for a trivial change.

Turn material risks into explicit acceptance cases. In sensitive domains, the product owner must define applicable privacy, retention and release obligations; an agent must not invent legal compliance or certify the system from source alone.

## Verify applicable controls

- Identity and permissions: enforce identity, capabilities and resource/tenant scope at trusted operations, not only in navigation or UI. Exercise permitted operations, denied operations, expired/missing identity where relevant, and cross-user/cross-tenant reads and writes. Include alternate access paths such as files, search, exports, realtime and background jobs when changed.
- Input and invariants: validate untrusted runtime values and enforce domain rules. Check atomic multi-step writes, replay/idempotency requirements and failure recovery for important mutations.
- Secrets and dependencies: keep privileged credentials out of clients, repositories and logs; separate environment permissions. Run available secret/dependency checks appropriate to the change, inspect results and applicability, and record unresolved issues. A scanner's clean result does not prove security; a dependency alert alone does not establish exploitability.
- Data lifecycle: identify what sensitive data is collected, its purpose, readers/writers, retention source and deletion behavior. Include replicas, caches, exports, files, logs and backup retention where applicable. Verify authorization for deletion, and state exceptions or delayed expiry instead of claiming immediate erasure everywhere.
- Auditability: for consequential operations, capture actor, action, resource, outcome and time with suitable access and retention controls. Do not log credentials, session tokens or unnecessary sensitive payloads. Verify required events and denial paths without assuming ordinary application logs are a complete audit trail.

## Evidence and limits

Use authorized, isolated test environments and synthetic principals/data for permission and misuse tests. Record source revision, environment, principal/role, operation, expected result, observed result and remaining gaps. Distinguish source inspection from exercised enforcement and hosted settings. Do not probe production users or shared resources to fill a verification gap.

Keep required but unexecuted cases visible in the feature's acceptance record. A missing best-practice control is not automatically a confirmed exploitable vulnerability; describe the concrete boundary and uncertainty. Request a separately scoped security review when the risk needs one.

Reference: [OWASP ASVS](https://asvs.owasp.org/) provides security requirements for web applications. Select applicable requirements and record the version when using its identifiers; other runtimes may need different guidance.
