import { type Dirent } from "fs";
import { readFile, rm, writeFile } from "fs/promises";
import { StringTemplate } from "@isdk/template-engines";

import { glob } from './glob.js';
import { TemplateConfig, toTemplateFiles } from "./template-config.js";
import { traverseFolder } from "./traverse-folder.js";

export async function applyTemplate(templateDir: string, options: TemplateConfig) {
  const files = toTemplateFiles(options.files || [])
  const data = options.parameters
  if (!data || Object.keys(data).length === 0) {
    console.log('no parameters to apply')
    return
  }

  const cleanFiles = options.clean
  const hasCleanFiles = Array.isArray(cleanFiles) && cleanFiles.length > 0

  const templateFormat = options.templateFormat || 'hf'
  await traverseFolder(templateDir, async (filePath, entry: Dirent) => {
    if (hasCleanFiles && glob(filePath, cleanFiles, templateDir)) {
      console.log(`delete: ${filePath}`)
      if (!options.dryRun) {await rm(filePath, {recursive: true, force: true})}
    } else if (entry.isFile() && glob(filePath, files, templateDir)) {
      const template = await readFile(filePath, 'utf8')
      const content = await StringTemplate.formatIf({template, data, templateFormat})
      if (content && content !== template) {
        if (!options.dryRun) {
          await writeFile(filePath, content, 'utf8')
          console.log(`apply template: ${filePath} saved.`)
        } else {
          // console.log(content)
          console.log(`apply template: ${filePath} done.`)
        }
      } else {
        console.log(`apply template: ${filePath} no change`)
      }
    } else {
      console.log(`skip: ${filePath}`)
    }
  })
  console.log(`Appied. Enjoy your project at ${templateDir}`)
}
