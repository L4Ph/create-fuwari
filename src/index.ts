import { input, select } from "@inquirer/prompts";
import fs from "node:fs/promises";
import downloadFuwari from "./utils/download-fuwari";
import { createSpinner } from "nanospinner";

const repo = "gh:saicaca/fuwari";
const spinner = createSpinner();

try {
  const spinner = createSpinner();
  spinner.start();
  const fuwariDir = await downloadFuwari(repo);
  spinner.success();

  const configPath = `${fuwariDir}/src/config.ts`;

  const configContent = await fs.readFile(configPath, "utf-8");

  const inputTitle = await input({
    message: "Please enter the site title:",
    default: "Fuwari",
  });
  const inputSubTitle = await input({
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
