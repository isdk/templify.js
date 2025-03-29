import { type Dirent } from "fs";
import { readFile, rm, writeFile } from "fs/promises";
import { globMatch } from '@isdk/glob';

import { TemplateConfig, TemplateFiles } from "./template-config.js";
import { traverseFolder } from "./traverse-folder.js";
import { StringTemplate } from "@isdk/template-engines";


const defaultAllTextFiles = [
  '**/*.((j|t)s?(x)|m(j|t)s)?(x)',
  '**/*.(md|markdown|txt|?(x)htm?(l)|yaml|yml|xml|json|bat|sh|bash|zsh|ini|css|scss|less|sass|py|rb|php|go|java|c|cpp|h|hpp|hxx|rust|zig)',
]

export async function applyTemplate(templateDir: string, options: TemplateConfig) {
  const files = toFiles(options.files || [])
  const data = options.parameters
  if (!data || Object.keys(data).length === 0) {
    console.log('no parameters to apply')
    return
  }

  const cleanFiles = options.clean
  const hasCleanFiles = Array.isArray(cleanFiles) && cleanFiles.length > 0

  const templateFormat = options.templateFormat || 'hf'
  await traverseFolder(templateDir, async (filePath, entry: Dirent) => {
    console.log('🚀 ~ file: apply-template.ts:32 ~ filePath, files:', entry.isFile() , filePath, files, globMatch(filePath, files))
    if (hasCleanFiles && globMatch(filePath, cleanFiles)) {
      console.log(`delete: ${filePath}`)
      await rm(filePath, {recursive: true, force: true})
    } else if (entry.isFile() && globMatch(filePath, files)) {
      const template = await readFile(filePath, 'utf8')
      const content = await StringTemplate.formatIf({template, data, templateFormat})
      if (content && content !== template) {
        await writeFile(filePath, content, 'utf8')
        console.log(`apply template: ${filePath} done`)
      } else {
        console.log(`apply template: ${filePath} no change`)
      }
    } else {
      console.log(`skip: ${filePath}`)
    }
  })
  console.log(`Appied. Enjoy your project at ${templateDir}`)
}

function toFiles(files: string[]|TemplateFiles) {
  if (!Array.isArray(files)) {
    const include = files.include || []
    const exclude = files.exclude || []
    if (include.length === 0) {
      include.push(...defaultAllTextFiles)
    }
    files = [...include]
    for (const file of exclude) {
      files.push(`!${file}`)
    }
  } else {
    files = [...files]
  }

  if (files.length === 0) {
    files.push(...defaultAllTextFiles)
  }
  return files
}