import { exec } from "child_process";
import util from "util";
const execAsync = util.promisify(exec);

export async function runCommand(cmd) {
  try {
    const { stdout, stderr } = await execAsync(cmd);
    console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (err) {
    console.error("Shell command failed:", err);
  }
}
