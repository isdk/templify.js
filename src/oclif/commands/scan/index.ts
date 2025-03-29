import {Args, Command, Flags} from '@oclif/core'
import { DefaultTemplifyConfigFileName } from '../../../lib/template-config.js'
import { scanTemplate } from '../../../lib/scan-template.js'

export default class ScanCommand extends Command {
  static args = {
    template_dir: Args.directory({description: 'the template folder to scan', required: true, default: '.'}),
  }
  static description = `🔎 Scan the template folder and generate or update the template config file("${DefaultTemplifyConfigFileName}").`
  static examples = [
    `<%= config.bin %> <%= command.id %> .
Scanned.
`,
  ]
  static flags = {
    files: Flags.string({char: 'f', description: 'the file patterns to scan, split by comma'}),
    dryRun: Flags.boolean({char: 'n', description: 'dry run mode'}),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(ScanCommand);
    const rootDir = args.template_dir;
    const options = {
      files: flags.files ? flags.files.split(',') : undefined,
      dryRun: flags.dryRun,
    }
    await scanTemplate(rootDir, options);
  }
}
