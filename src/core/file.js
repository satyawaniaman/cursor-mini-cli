import fs from "fs/promises";
import chalk from "chalk";
import path from "path";
export async function saveCode(filePath, code) {
  await fs.writeFile(filePath, code);
  console.log(chalk.green(`✅ Saved to ${filePath}`));
}

export async function saveFilesToFolder(baseDir, files) {
  await fs.mkdir(baseDir, { recursive: true });

  for (const { filePath, fileContent } of files) {
    const fullPath = path.join(baseDir, filePath);
    const folder = path.dirname(fullPath);
    await fs.mkdir(folder, { recursive: true });
    await fs.writeFile(fullPath, fileContent);
    console.log(chalk.green(`✅ ${filePath} created.`));
  }
}
