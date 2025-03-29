import path from 'path'
import {Args, Command, Flags} from '@oclif/core'
import { applyTemplate, DefaultDataFileName, DefaultTemplifyConfigFileName, getInputDataBySchema, loadConfigFile } from '../../../lib/index.js'

export default class ApplyCommand extends Command {
  static aliases = ['']
  static args = {
    template_dir: Args.directory({description: 'the template folder to apply', required: true, default: '.'}),
    data: Args.string({description: 'the json data to apply. see also `--data data-file-path`'}),
  }
  static description = '🚀 Apply template data configuration etc to the template folder directly.'
  static examples = [
    `<%= config.bin %> <%= command.id %> .
Appied. Enjoy your project at "."
`,
  ]
  static flags = {
    data: Flags.file({char: 'd', description: 'the data file to apply. see also DATA argument'}),
    interactive: Flags.boolean({char: 'i', description: 'interactive mode', default: true, allowNo: true}),
    dryRun: Flags.boolean({char: 'n', description: 'dry run mode'}),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(ApplyCommand)
    const rootDir = args.template_dir
    let dataPath = flags.data
    let data: any = args.data ? JSON.parse(args.data) : undefined
    const nonInteractive = !flags.interactive
    if (nonInteractive && !dataPath && !data) {
      dataPath = DefaultDataFileName
    }
    if(dataPath && !path.isAbsolute(dataPath)) {
      dataPath = path.join(rootDir, dataPath)
    }

    const templifyConfigFilepath = path.join(rootDir, DefaultTemplifyConfigFileName)
    const tempifyConfig: any = loadConfigFile(templifyConfigFilepath, {externalFile: 'README.md'})
    if (!tempifyConfig) {
      this.error('No template schema found. Please create a template schema file at ./.templify.yaml')
    }

    if (!tempifyConfig.parameters) {
      this.error('No parameters found. Please create a parameters section in ./.templify.yaml')
    }

    const schema = {
      title: 'Templify: Instantly convert project into template',
      ...tempifyConfig,
      type: 'object',
      properties: tempifyConfig.parameters,
    }
    const dryRun = flags.dryRun ?? tempifyConfig.dryRun

    data = await getInputDataBySchema(schema, {
      rootDir,
      dataPath,
      data,
      nonInteractive,
      defaultDataFileName: DefaultDataFileName,
      dryRun,
    })

    if (data) {
      await applyTemplate(rootDir, {...tempifyConfig, parameters: data, dryRun})
    } else {
      this.error('No data found. Please create a data file at ./templify-data.json')
    }
  }
}
