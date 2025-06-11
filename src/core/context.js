import fs from "fs/promises";
import path from "path";

export async function getProjectContext(dir = process.cwd()) {
  const context = [];

  async function walk(currentPath) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      const EXCLUDED_DIRS = [
        "node_modules",
        ".git",
        "dist",
        "build",
        ".next",
        ".nuxt",
        ".cache",
        ".vscode",
        ".idea",
        "coverage",
        ".nyc_output",
        // Add CLI-specific exclusions
        "cursor-mini-cli-me", // if the CLI is in a subfolder
        "cli-tools",
        "scripts"
      ];

      if (
        entry.isDirectory() &&
        !EXCLUDED_DIRS.includes(entry.name)
      ) {
        await walk(fullPath);
      } else if (entry.isFile() && fullPath.endsWith(".js")) {
        const code = await fs.readFile(fullPath, "utf-8");
        context.push({ file: fullPath, content: code.slice(0, 1000) }); // Limit size
      }
    }
  }

  await walk(dir);
  return context;
}
