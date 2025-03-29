import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { mimeType } from 'mime-type/with-db'
import { Config as ConfigFile } from 'load-config-file'

import { getMultiLevelExtname } from './get-multi-level-extname.js'
import { parseYaml, stringifyYaml } from './yaml.js'
import { parseFrontMatter } from './front-matter.js'

function parseJson(content: string) {
  return JSON.parse(content)
}

ConfigFile.register(['.yml', '.yaml'], parseYaml as any)
ConfigFile.register(['.json'], parseJson)

export { ConfigFile }

export const DefaultAllTextFiles = [
  '**/*.((j|t)s?(x)|m(j|t)s)?(x)',
  '**/*.(md|markdown|txt|?(x)htm?(l)|yaml|yml|xml|json|bat|sh|bash|zsh|ini|css|scss|less|sass|py|rb|php|go|java|c|cpp|h|hpp|hxx|rust|zig)',
]
export const DefaultTemplifyConfigFileName = '.templify.yaml'
export const DefaultDataFileName = 'templify-data'

export interface TemplateFiles {
  include?: string[]
  exclude?: string[]
}

export interface TemplateParameterItem {
  name?: string
  description?: string
  type?: string
  default?: any
  choices?: string[]
}

export interface TemplateConfig {
  files?: string[]|TemplateFiles
  parameters?: Record<string, TemplateParameterItem>
  clean?: string[]
  templateFormat?: string
  dryRun?: boolean
}

export function saveConfigFile(filename: string, config: any, extLevel = 1) {
  if (filename[0] === '.') {extLevel++}
  const extname = getMultiLevelExtname(filename, extLevel)
  if (!extname || (extname.split('.').length <= 1)) {filename += '.yaml'}
  const mime = mimeType.lookup(filename) as string
  if (mime === 'application/json')
    config = JSON.stringify(config, null, 2)
  else if (mime === 'text/yaml') {
    config = stringifyYaml(config)
  } else {
    throw new Error(`${filename} unsupported mime type: ${mime}`)
  }
  const dirname = path.dirname(filename)
  if (!existsSync(dirname)) {
    mkdirSync(dirname, {recursive: true})
  }
  writeFileSync(filename, config, {encoding: 'utf8'})
  return filename
}

export function loadConfigFile(filename: string, {extLevel = 1, externalFile}: {extLevel?: number, externalFile?: string} = {}) {
  if (filename[0] === '.') {extLevel++}
  const extname = getMultiLevelExtname(filename, extLevel)
  if (extname && (extname.split('.').length > 1)) {
    // remove the extension
    filename = filename.slice(0, -extname.length)
  }
  let result = ConfigFile.loadSync(filename)
  if (!result && externalFile) {
    const dirname = path.dirname(filename)
    const readmeFilepath = path.join(dirname, externalFile)
    if (existsSync(readmeFilepath)) {
      const data = parseFrontMatter(readFileSync(readmeFilepath, 'utf8')).data
      if (Object.keys(data).length) {
        result = data
      }
    }
  }
  return result
}

export function toTemplateFiles(files: string[]|TemplateFiles) {
  if (!Array.isArray(files)) {
    const include = files.include || []
    const exclude = files.exclude || []
    if (include.length === 0) {
      include.push(...DefaultAllTextFiles)
    }
    files = [...include]
    for (const file of exclude) {
      files.push(`!${file}`)
    }
  } else {
    files = [...files]
  }

  if (files.length === 0) {
    files.push(...DefaultAllTextFiles)
  }
  return files
}
