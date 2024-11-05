import { input } from "@inquirer/prompts";
import { downloadTemplate } from "giget";

export default async function downloadFuwari(
  projectName: string,
  installDeps: boolean,
) {
  const repo = "gh:saicaca/fuwari";

  try {
    const destination = `./${projectName}`;

    const { dir } = await downloadTemplate(repo, {
      dir: destination,
      install: installDeps,
      force: true,
      offline: true,
    });
    console.log("Downloaded to:", dir);

    return dir;
  } catch (error: any) {
    console.error("Error downloading template:", error.message);
    console.error(error);
  }
}
