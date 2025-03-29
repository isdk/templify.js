import { parseYaml } from './yaml.js'
import { removeLeadingEmptyLines } from './remove-leading-empty-lines.js'

const FrontMatterDelimiter = '---'

export function parseFrontMatter(value: string, delimiter: string = FrontMatterDelimiter)
{
  const start = delimiter.length
  const _value = removeLeadingEmptyLines(value)

  if (_value.startsWith(delimiter) && (_value[delimiter.length] === '\n' || _value[delimiter.length] === '\r')) {
    let end = _value.indexOf('\n' + delimiter, start)
    if (end !== -1) {
      const data = _value.slice(start, end)
      end += delimiter.length+1
      while (_value[end] === '\n' || _value[end] === '\r') {
        end++
      }
      const content = _value.slice(end)
      return {
        data: parseYaml(data) || {},
        content,
      }
    }
  }

  return {
    data: {},
    content: value,
  }
}
