/**
 * Generic architecture-boundary starter.
 *
 * Adapt `rules` to the repository's approved architecture.
 * This intentionally does NOT assume every project has `apps/` or `packages/`.
 *
 * Usage:
 *   node scripts/check-architecture.mjs
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (["node_modules", ".next", "dist", "build", ".git"].includes(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function importsOf(source) {
  const imports = [];
  const patterns = [
    /from\s+["']([^"']+)["']/g,
    /import\s+["']([^"']+)["']/g,
    /require\(\s*["']([^"']+)["']\s*\)/g,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) imports.push(match[1]);
  }
  return imports;
}

const rules = [
  {
    name: "Applications must not import another application's source",
    applies(file) {
      return file.includes(`${path.sep}apps${path.sep}`);
    },
    violates(file, specifier) {
      if (!specifier.includes("apps/") && !specifier.includes("apps\\")) return false;
      const normalized = file.replaceAll("\\", "/");
      const current = normalized.match(/\/apps\/([^/]+)\//)?.[1];
      const target = specifier.replaceAll("\\", "/").match(/apps\/([^/]+)/)?.[1];
      return Boolean(current && target && current !== target);
    },
  },
  {
    name: "Workspace packages must not import application source",
    applies(file) {
      return file.includes(`${path.sep}packages${path.sep}`);
    },
    violates(_file, specifier) {
      return /(^|\/)apps\//.test(specifier.replaceAll("\\", "/"));
    },
  },
];

// Add project-specific rules after architecture approval.
// Examples:
// - feature-to-feature imports forbidden;
// - route imports from feature internals forbidden;
// - shared components importing feature modules forbidden;
// - server-only modules imported by client modules forbidden.

const files = walk(ROOT).filter((file) => SOURCE_EXTENSIONS.has(path.extname(file)));
const failures = [];

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  for (const specifier of importsOf(source)) {
    for (const rule of rules) {
      if (rule.applies(file) && rule.violates(file, specifier)) {
        failures.push({ rule: rule.name, file: path.relative(ROOT, file), specifier });
      }
    }
  }
}

if (failures.length) {
  console.error("\nArchitecture violations:\n");
  for (const failure of failures) {
    console.error(`- ${failure.rule}\n  ${failure.file} -> ${failure.specifier}`);
  }
  process.exit(1);
}

console.log("Architecture checks passed.");
