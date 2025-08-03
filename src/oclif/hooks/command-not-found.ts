import type { Config, Hook } from '@oclif/core'

export async function commandNotFound(this: Hook.Context, options: {id: string, argv: any[], userConfig: any, config: Config}) {
  if (options.id?.startsWith('apply')) throw new Error('Can not find command: ' + options.id + '!')
  return options.config.runCommand('apply', [...options.id.split(':'), ...options.argv])
}

export default commandNotFound

