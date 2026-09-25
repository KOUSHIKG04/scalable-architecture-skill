#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename); const command = process.argv[2];

if (command === "init") {
  const packageRoot = path.resolve(__dirname, "..");
  
  const targetRoot = path.join(
  process.cwd(),".architecture",
  "adpt-exemplar"
  )

  fs.mkdirSync(targetRoot, { recursive: true })

  const filesToCopy = ["SKILL.md", "references", "templates", "examples"];

  console.log("\n🏗️  Adpt-Exemplar Skill\n");

  for (const item of filesToCopy) {
    const source = path.join(packageRoot, item);
    const destination = path.join(targetRoot, item);

    if (!fs.existsSync(source)) continue;

    if (fs.existsSync(destination)) {
      console.log(`!! Skipped ${item} — already exists`);
      continue;
    }

    fs.cpSync(source, destination, { recursive: true });

    console.log(`- Added ${item}`);
  }

  console.log(`\n 
    -- Adpt-Exemplar skill installed successfully.

    -- Next: Ask your AI coding agent: 
       "Read SKILL.md and use it as the architecture decision framework for this project before implementation."`);

  process.exit(0);
}

if (command === "--version" || command === "-v") {
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8"),
  );

  console.log(packageJson.version);
  process.exit(0);
}

console.log(`\n Adpt-Exemplar Skill

    Usage:
    adpt-exemplar init
    
    Commands:
    init          Install the adpt-exemplar skill
    --version     Show installed version
    
    Examples:
    npx adpt-exemplar init
    pnpm dlx adpt-exemplar init
    bunx adpt-exemplar init
`);
