# Using Vaastu for Small and Large Projects

Use the same skill at both sizes. Match the depth of planning, documentation and verification to the requested change and its risks, rather than forcing a large architecture onto a small app.

## Install and describe the task

1. Install Vaastu from the root of the project where you want to use it, and select your coding agent when prompted.
2. Describe the outcome, current code, constraints, implementation scope and observable acceptance criteria. Ask the agent to read the installed SKILL.md; automatic discovery depends on the agent.
3. For a focused task, use a short prompt. For a substantial build, fill in the full-project template or reference existing requirements. Say whether you want only a proposal or actual implementation.

```sh
# npm
npx skills add KOUSHIKG04/scalable-architecture-skill --skill vaastu

# pnpm
pnpm dlx skills add KOUSHIKG04/scalable-architecture-skill --skill vaastu

# Bun
bunx skills add KOUSHIKG04/scalable-architecture-skill --skill vaastu

# Yarn 2+
yarn dlx skills add KOUSHIKG04/scalable-architecture-skill --skill vaastu
```

Yarn Classic (1.x) users can use the npm / npx command instead.

## Small project: a personal expense tracker

One existing web application, browser-local persistence, and a single focused workflow. Use the short prompt and existing conventions; do not add a backend, workspace packages or an ADR unless the actual requirements justify them.

```text
Read .agents/skills/vaastu/SKILL.md and apply the relevant guidance to this existing web app.

Implement a personal expense tracker with add, edit and delete actions, a running total, and browser-local persistence. Reuse the current UI and project structure. No accounts, backend service or multi-app workspace are needed for this task.

Acceptance criteria: reject invalid or non-positive amounts; totals update after each change; saved expenses survive a page reload; existing routes and unrelated behavior remain intact.

Inspect the code, state a brief plan, and implement the scoped workflow. Verify the acceptance criteria with appropriate checks and report anything you could not exercise.
```

Expected approach: inspect the existing app, keep ownership local, implement one complete workflow, and verify it. A short plan is enough; no separate feature specification or full architecture proposal is required for this focused example.

## Large project: a multi-tenant order platform

Customer and operations experiences share durable order workflows with different permissions. Use the full-project template and documented requirements. Separate applications, packages and services only where the requirements justify the boundary.

```text
Read .agents/skills/vaastu/SKILL.md and REQUIREMENTS.md. Use the full-project implementation template and relevant supporting resources for this task.

Build the must-have scope in REQUIREMENTS.md for a multi-tenant order platform with customer and operations experiences. Customers create and view their own tenant’s orders. Authorized operations users update order status within their assigned tenant. Persist orders on the trusted backend and reject unauthorized or cross-tenant reads and writes.

Inspect the repository and present the simplest justified architecture and dependency-ordered plan before substantial edits. This request authorizes implementation of the documented must-have scope. Implement one connected create-order workflow first, verify it, and then complete the remaining dependency-ready must-have workflows.

Record significant decisions and relevant measurable requirements, with their sources and owners. Use feature acceptance criteria and the Definition of Done. Verify applicable contracts, permissions, data/retry behavior, dependencies and integrations. For a release, assess the relevant CI, migrations, recovery and operational checks.

Do not add speculative services or implement later features. Preserve existing behavior outside scope, and distinguish implemented, tested, deployed and operationally verified work. Report missing requirements or blocked integrations explicitly.
```

Before using this example, write REQUIREMENTS.md with the actual must-have workflows, roles, stack constraints, expected workload, relevant performance/recovery targets and release criteria. The full-project template supplies these fields. Unknown targets must remain explicit rather than being invented.

The short prompt remains the default. The full-project prompt adds context and delivery criteria for substantial work; it does not make every small change require a proposal, ADR, feature specification or new infrastructure.

For a substantial build, fill in [the full-project implementation prompt](../templates/PROJECT_IMPLEMENTATION_PROMPT.md) or reuse your existing requirements. These are illustrative requests, not evidence that a particular application has been built, load-tested or released.
