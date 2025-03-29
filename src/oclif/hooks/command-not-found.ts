import type { Config, Hook } from '@oclif/core'

export async function commandNotFound(this: Hook.Context, options: {id: string, argv: any[], userConfig: any, config: Config}) {
  return options.config.runCommand('apply', [options.id, ...options.argv])
}

export default commandNotFound

