import type { Config, Hook } from '@oclif/core'

export async function commandNotFound(this: Hook.Context, options: {id: string, argv: any[], userConfig: any, config: Config}) {
console.log('🚀 ~ file: command-not-found.ts:4 ~ options:', options)
}

export default commandNotFound

