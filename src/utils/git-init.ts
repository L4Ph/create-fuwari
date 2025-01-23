import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export async function initializeGit(projectDir: string) {
  try {
    const { stdout, stderr } = await execAsync("git init", {
      cwd: projectDir
    });

    if (stderr) {
      console.error(`Git initialization error: ${stderr}`);
      return;
    }

    console.log(`Git repository has been initialized: ${stdout}`);
  } catch (error) {
    console.error(`Fatal error: ${error}`);
  }
}