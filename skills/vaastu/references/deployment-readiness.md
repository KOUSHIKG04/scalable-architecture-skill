# Deployment, Recovery and Operational Readiness

Use this guide when planning or validating a release or an operational change. Record what applies to this project's risks and delivery stage. A simple MVP may use a managed platform's logs and health reporting; do not require a telemetry stack, Kubernetes, or a multi-stage pipeline without a concrete need.

## Continuous checks

Identify the checks protecting important behavior and dependency boundaries. Run appropriate type/lint/build, focused tests, contract/integration checks and adapted boundary checks in CI on changes to the relevant code, using the existing CI provider when one exists. Record the source revision and results. A locally passing command does not establish that CI executed or branch/release controls are configured.

For a project that needs no CI yet, document the release verification method and its limits rather than claiming CI coverage. Never silently bypass a required failing check or broaden this task into a CI migration.

## Release and data-change plan

- Identify release owner, target environment, exact artifact/revision, configuration and secret sources, permissions, external-service prerequisites and acceptance checks. Separate public and server-only values.
- Plan reproducible migrations and their ordering with application releases. Assess mixed-version compatibility, lock/downtime exposure, data-loss risk, backfills and any irreversible steps. Prefer compatible staged changes where needed.
- Define a rollback or roll-forward path for application code and configuration. A destructive down migration may not recover lost data. Name prerequisites, trigger conditions, responsible owner and validation steps; do not imply a backup exists or has been restored successfully without evidence.
- Record backup/restore responsibilities and agreed recovery objectives where persistent data matters. Recovery time objective is the acceptable time to restore service; recovery point objective is the acceptable data-loss window. Use requirements, not guessed numbers.
- Exercise migration/recovery behavior in an authorized representative test environment where required. After an authorized release, run the agreed smoke checks and observe important error/health signals. Publishing or deployment is a separate action and follows current authorization.

## Make important failures diagnosable

For critical workflows identify useful structured events, error tracking and health signals. Add request/job correlation where it materially helps trace failures across boundaries. Record actionable measurements such as request latency, error rate, queue lag or integration failures against the project's stated targets. A process being alive does not establish that its dependencies or a business workflow are healthy.

Choose who owns incidents, how alerts or failures reach that owner, where investigation starts and which recovery action is safe. Avoid paging or logging every low-value event. Protect operational endpoints and sanitize sensitive telemetry; define access and retention. Verify that a representative failure is observable without exposing secrets or private data.

## Release acceptance record

| Check | Required evidence |
| --- | --- |
| Artifact and CI | Revision/artifact, check results, and unresolved failures |
| Configuration | Target environment and required settings verified without recording secrets |
| Data change | Compatibility/migration result and recovery limitations |
| Workflow smoke test | Critical outcome and denied/failure cases as applicable |
| Operations | Health/error visibility, owner, and recovery path |

For each check state passed, failed, not run, or not applicable with its reason, environment and evidence. Implementation, CI success, deployment and operational acceptance are separate states. Do not call a release production-ready while required evidence is missing.

Reference: [OpenTelemetry observability primer](https://opentelemetry.io/docs/concepts/observability-primer/) explains how telemetry supports investigation; adopting OpenTelemetry is optional.
