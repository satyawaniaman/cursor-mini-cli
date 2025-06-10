// src/core/project-init.js
import fs from "fs/promises";
import path from "path";
import { runCommand } from "../utils/shell.js";
import chalk from "chalk";

export async function initProjectFolder(dir) {
  const pkgPath = path.join(dir, "package.json");

  try {
    // Skip if already has package.json
    await fs.access(pkgPath);
    console.log(chalk.gray("ℹ️  package.json already exists."));
  } catch {
    const pkgJson = {
      name: path.basename(dir),
      version: "1.0.0",
      description: "",
      scripts: {
        start: "npx live-server",
      },
    };
    await fs.writeFile(pkgPath, JSON.stringify(pkgJson, null, 2));
    console.log(chalk.green("✅ package.json created."));
  }

  // Install live-server for frontend preview
  console.log(chalk.yellow("📦 Installing live-server..."));
  await runCommand(`cd ${dir} && pnpm add -D live-server`);
}
