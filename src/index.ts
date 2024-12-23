import { input, select, confirm } from "@inquirer/prompts";
import fs from "node:fs/promises";
import downloadFuwari from "./utils/download-fuwari";
import { readPackageJSON, writePackageJSON } from "pkg-types";
import path from "node:path";

const projectName = await input({
  message: "Please enter the project name:",
  default: "fuwari",
});
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

const installDeps = await confirm({ message: "Install Dependencies?" });

const projectDir = await downloadFuwari(projectName, installDeps);

const configPath = `${projectDir}/src/config.ts`;

const configContent = await fs.readFile(configPath, "utf-8");

const updatedConfigContent = configContent
  .replace(/title: 'Fuwari'/, `title: '${inputTitle}'`)
  .replace(/subtitle: 'Demo Site'/, `subtitle: '${inputSubTitle}'`)
  .replace(/lang: 'en'/, `lang: '${selectLang}'`);

await fs.writeFile(configPath, updatedConfigContent, "utf-8");

const packageJson = await readPackageJSON(projectDir);

if (packageJson.name && projectDir) {
  packageJson.name = projectName;
  const jsonPath = path.resolve(projectDir, "package.json");
  await writePackageJSON(jsonPath, packageJson);
}

console.log("Done!😊");
console.log(`cd ${projectName}`);
