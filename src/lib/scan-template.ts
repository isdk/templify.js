import { readFile, rm, writeFile } from "fs/promises";
import path from 'path';
import { DefaultAllTextFiles, DefaultTemplifyConfigFileName, TemplateConfig, loadConfigFile, toTemplateFiles, saveConfigFile } from "./template-config.js";
import { traverseFolder } from "./traverse-folder.js";
import { glob } from "./glob.js";
import { isBinaryFile } from "isbinaryfile";
import { StringTemplate } from "@isdk/template-engines";

export async function scanTemplate(templateDir: string, options?: TemplateConfig) {
  // let templateConfig: TemplateConfig = {
  //   files: DefaultAllTextFiles,
  //   parameters: {},
  //   clean: [],
  //   templateFormat: 'json'
  // };
  const templifyConfigFilepath = path.join(templateDir, DefaultTemplifyConfigFileName);
  const tempifyConfig: any = loadConfigFile(templifyConfigFilepath, {externalFile: 'README.md'}) || {};
  const files: string[] = toTemplateFiles(tempifyConfig.files || []);
  const searchFiles: string[] = options?.files as any || DefaultAllTextFiles;
  let found = 0;

  await traverseFolder(templateDir, async (filePath, entry) => {
    if (entry.isDirectory()) {
      return;
    }
    if (glob(filePath, searchFiles, templateDir) && !(await isBinaryFile(filePath))) {
      const content = await readFile(filePath, 'utf8');
      if (StringTemplate.isTemplate({template: content, templateFormat: tempifyConfig.templateFormat})) {
        const filename = path.relative(templateDir, filePath);
        console.log(`found template file: ${filename}`);
        if (!files.includes(filename)) {
          files.push(filename);
          found++;
        }
      }
    }
  })

  if (found) {
    console.log(`Scanned. found ${found} template files`);
    tempifyConfig.files = files;
    if (!options?.dryRun) {
      saveConfigFile(templifyConfigFilepath, tempifyConfig);
      console.log(`Saved ${templifyConfigFilepath}`);
    }
  }
}
