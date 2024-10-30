import { input } from "@inquirer/prompts";
import { downloadTemplate } from "giget";
import { createSpinner } from "nanospinner";

export default async function downloadFuwari(repo: string) {
  try {
    const folderName = await input({
      message: "Please enter the project name:",
      default: "fuwari",
    });

    const destination = `./${folderName}`;

    const spinner = createSpinner().start();
    const { dir } = await downloadTemplate(repo, {
      dir: destination,
      force: true,
      offline: true,
    });
    spinner.success({ text: "Template downloaded successfully." });
    console.log("Downloaded to:", dir);

    return dir;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error downloading template:", error.message);
      console.error(error);
    }
  }
}
