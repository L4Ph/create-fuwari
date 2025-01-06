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
    });
    console.log("Downloaded to:", dir);

    return dir;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.error("Error downloading template:", error.message);
    console.error(error);
  }
}
