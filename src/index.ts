import fs from "node:fs/promises";
import path from "node:path";
import { confirm, input, select } from "@inquirer/prompts";
import { readPackageJSON, writePackageJSON } from "pkg-types";
import type { SiteConfig } from "./types/config";
import downloadFuwari from "./utils/download-fuwari";
import { initializeGit } from "./utils/git-init";

const projectName = await input({
	message: "Please enter the project name:",
	default: "fuwari",
});

const inputTitle = (await input({
	message: "Please enter the site title:",
	default: "Fuwari",
})) as SiteConfig["title"];

const inputSubTitle = (await input({
	message: "Please enter the site subtitle:",
	default: "Demo Site",
})) as SiteConfig["subtitle"];

const selectLang = (await select({
	message: "Please select the language of the site.",
	default: "en",
	choices: ["en", "zh_CN", "zh_TW", "ja", "ko", "es", "th"] as const,
})) as SiteConfig["lang"];

const installDeps = await confirm({ message: "Install Dependencies?" });

const gitInit = await confirm({ message: "Initialize Git?" });

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

if (gitInit && projectDir) {
  await initializeGit(projectDir);
}

console.log("Project setup complete!");
console.log(`cd ${projectName}`);
if (!installDeps) {
  console.log("pnpm install");
}
console.log("pnpm run dev");