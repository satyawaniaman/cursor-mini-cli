import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import { generateCode, extractFilesFromCode } from "../core/codegen.js";
import { getProjectContext } from "../core/context.js";
import { saveFilesToFolder } from "../core/file.js";
import { initProjectFolder } from "../core/project-init.js";
import { runCommand } from "../utils/shell.js";

async function main() {
  const { task } = await inquirer.prompt([
    { type: "input", name: "task", message: "Describe the code you want:" },
  ]);

  const contextSpinner = ora("Parsing project...").start();
  const context = await getProjectContext();
  contextSpinner.succeed("Context parsed.");

  const codeSpinner = ora("Generating code with GPT-4o...").start();
  const response = await generateCode(task, context);
  codeSpinner.succeed("Code generated!");

  const files = extractFilesFromCode(response);
  if (files.length === 0) {
    console.log(chalk.red("❌ No files found in response."));
    return;
  }

  const { dir } = await inquirer.prompt([
    {
      type: "input",
      name: "dir",
      message: "Enter folder to save files:",
      default: "generated-project",
    },
  ]);

  await saveFilesToFolder(dir, files);

  await initProjectFolder(dir);

  const { runNow } = await inquirer.prompt([
    {
      type: "confirm",
      name: "runNow",
      message: "Run project now?",
      default: true,
    },
  ]);

  if (runNow) {
    console.log(chalk.blue("\n🚀 Launching project..."));
    await runCommand(`cd ${dir} && pnpm start`);
  }
}

main();
