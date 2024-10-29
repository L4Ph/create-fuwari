import { input } from "@inquirer/prompts";
import { downloadTemplate } from "giget";

export default async function downloadFuwari(repo: string) {
  const folderName = await input({
    message: "Please enter the project name:",
    default: "fuwari",
  });

  const destination = `./${folderName}`;

  const { dir } = await downloadTemplate(repo, { dir: destination, force: true, offline: true });
  console.log("Template downloaded successfully to:", dir);

  return dir
}
