import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skill = path.join(root, "skills", "vaastu");

test("skill is self-contained and every linked resource is shipped", () => {
  const entry = fs.readFileSync(path.join(skill, "SKILL.md"), "utf8");
  assert.match(entry, /^---\r?\nname: vaastu\r?\n/);
  const links = [...entry.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]);
  assert.ok(links.length > 0);
  for (const link of links) {
    const resource = path.resolve(skill, link);
    assert.ok(resource.startsWith(skill + path.sep), "Resource must stay inside the skill: " + link);
    assert.ok(fs.statSync(resource).isFile(), "Missing resource: " + link);
  }
  assert.equal(fs.existsSync(path.join(skill, "tests")), false);
  assert.equal(fs.existsSync(path.join(skill, "package.json")), false);
  assert.equal(fs.existsSync(path.join(skill, ".github")), false);
  assert.ok(fs.existsSync(path.join(skill, "LICENSE.txt")));
});

test("distribution contains the standard skill folder without a custom installer", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  assert.equal(pkg.bin, undefined);
  assert.deepEqual(pkg.files, ["skills", "README.md", "LICENSE", "assets"]);
  assert.equal(fs.existsSync(path.join(root, "SKILL.md")), false);
  assert.equal(fs.existsSync(path.join(root, "bin", "cli.js")), false);
});
