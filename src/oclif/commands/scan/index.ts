import {Args, Command} from '@oclif/core'

export default class ScanCommand extends Command {
  static args = {
    template_dir: Args.directory({description: 'the template folder to apply', required: true, default: '.'}),
  }
  static description = '🔎 Scan the template folder and generate or update the template config file.'
  static examples = [
    `<%= config.bin %> <%= command.id %> .
Scanned.
`,
  ]
  static flags = {
  }

  async run(): Promise<void> {
    // const {args, flags} = await this.parse(ScanCommand)
    // const dataFilePath = flags.data
    // const data = args.data


    this.log(`TODO`)
  }
}
