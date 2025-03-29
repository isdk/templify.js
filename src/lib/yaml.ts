import { parse, stringify } from 'yaml'

import type { CreateNodeOptions, DocumentOptions, ParseOptions, SchemaOptions, Tags, ToJSOptions, ToStringOptions } from 'yaml'

const YamlTags: Tags = []

export function registerYamlTag(tags: any) {
  if (!Array.isArray(tags)) {
    tags = [tags]
  }
  for (const tag of tags) {
    const result = YamlTags.indexOf(tag) === -1
    if (result) { YamlTags.push(tag) }
  }
}

export function parseYaml(content: string, options?: ParseOptions & DocumentOptions & SchemaOptions & ToJSOptions) {
  if (!options) {
    options = {customTags: YamlTags}
  } else {
    if (!options.customTags) {
      options.customTags = YamlTags
    } else if (Array.isArray(options.customTags)) {
      options.customTags = YamlTags.concat(options.customTags)
    } else if (typeof options.customTags === 'function') {
      const customTags = options.customTags
      options.customTags = (tags)=> customTags(YamlTags.concat(tags))
    }
  }
  return parse(content, options)
}

export function stringifyYaml(content: any, options?: DocumentOptions & SchemaOptions & ParseOptions & CreateNodeOptions & ToStringOptions) {
  if (!options) {
    options = {customTags: YamlTags}
  } else {
    if (!options.customTags) {
      options.customTags = YamlTags
    } else if (Array.isArray(options.customTags)) {
      options.customTags = YamlTags.concat(options.customTags)
    } else if (typeof options.customTags === 'function') {
      const customTags = options.customTags
      options.customTags = (tags)=> customTags(YamlTags.concat(tags))
    }
  }
  return stringify(content, options)
}

