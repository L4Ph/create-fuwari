import degit from "degit";
import { input, select } from "@inquirer/prompts";
import fs from "fs/promises";

const repo = "https://github.com/saicaca/fuwari.git";

export default async function downloadTemplate() {
  try {
    const folderName = await input({
      message: "Please enter the project name:",
      default: "fuwari",
    });

    const destination = `./${folderName}`;

    const emitter = degit(repo, { force: true, verbose: true });

    await emitter.clone(destination);
    console.log("Template downloaded successfully to:", destination);

    const configPath = `${destination}/src/config.ts`;

    const configContent = await fs.readFile(configPath, "utf-8");

    const inputTitle = input({
      message: "Please enter the site title:",
      default: "Fuwari",
    });
    const inputSubTitle = input({
      message: "Please enter the site subtitle:",
      default: "Demo Site",
    });
    const selectLang = await select({
      message: "Please select the language of the site.",
      default: "en",
      choices: ["en", "zh_CN", "zh_TW", "ja", "ko"],
    });

    const updatedConfigContent = configContent
      .replace(/title: 'Fuwari'/, `title: '${inputTitle}'`)
      .replace(/subtitle: 'Demo Site'/, `subtitle: '${inputSubTitle}'`)
      .replace(/lang: 'en'/, `lang: '${selectLang}'`);

    await fs.writeFile(configPath, updatedConfigContent, "utf-8");

    console.log("config updated successfully!");
  } catch (error) {
    console.error("Failed to download template:", error);
  }
}
