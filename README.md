Templify: Instantly convert project into template
=====

Turn any project into a reusable template in seconds—keep your structure, replace variables smartly, and ship templates that just work.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/templify.svg)](https://npmjs.org/package/templify)
[![Downloads/week](https://img.shields.io/npm/dw/templify.svg)](https://npmjs.org/package/templify)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g templify
$ templify COMMAND
running command...
$ templify (--version)
templify/0.1.0 linux-x64 node-v20.18.0
$ templify --help [COMMAND]
USAGE
  $ templify COMMAND
...
```
<!-- usagestop -->
# Commands

<!-- commands -->
* [`templify TEMPLATE_DIR [DATA]`](#templify-template_dir-data)
* [`templify apply TEMPLATE_DIR [DATA]`](#templify-apply-template_dir-data)
* [`templify help [COMMAND]`](#templify-help-command)
* [`templify plugins`](#templify-plugins)
* [`templify plugins add PLUGIN`](#templify-plugins-add-plugin)
* [`templify plugins:inspect PLUGIN...`](#templify-pluginsinspect-plugin)
* [`templify plugins install PLUGIN`](#templify-plugins-install-plugin)
* [`templify plugins link PATH`](#templify-plugins-link-path)
* [`templify plugins remove [PLUGIN]`](#templify-plugins-remove-plugin)
* [`templify plugins reset`](#templify-plugins-reset)
* [`templify plugins uninstall [PLUGIN]`](#templify-plugins-uninstall-plugin)
* [`templify plugins unlink [PLUGIN]`](#templify-plugins-unlink-plugin)
* [`templify plugins update`](#templify-plugins-update)
* [`templify scan TEMPLATE_DIR`](#templify-scan-template_dir)

## `templify TEMPLATE_DIR [DATA]`

Apply template data configuration etc to the template folder directly.

```
USAGE
  $ templify  TEMPLATE_DIR [DATA] [-d <value>] [-i]

ARGUMENTS
  TEMPLATE_DIR  [default: .] the template folder to apply
  DATA          the json data to apply. see also `--data data-file-path`

FLAGS
  -d, --data=<value>      the data file to apply. see also DATA argument
  -i, --[no-]interactive  interactive mode

DESCRIPTION
  Apply template data configuration etc to the template folder directly.

ALIASES
  $ templify 

EXAMPLES
  $ templify  .
  Appied. Enjoy your project at "."
```

## `templify apply TEMPLATE_DIR [DATA]`

Apply template data configuration etc to the template folder directly.

```
USAGE
  $ templify apply TEMPLATE_DIR [DATA] [-d <value>] [-i]

ARGUMENTS
  TEMPLATE_DIR  [default: .] the template folder to apply
  DATA          the json data to apply. see also `--data data-file-path`

FLAGS
  -d, --data=<value>      the data file to apply. see also DATA argument
  -i, --[no-]interactive  interactive mode

DESCRIPTION
  Apply template data configuration etc to the template folder directly.

ALIASES
  $ templify 

EXAMPLES
  $ templify apply .
  Appied. Enjoy your project at "."
```

_See code: [src/commands/apply/index.ts](https://github.com/isdk/templify.js/blob/v0.1.0/src/commands/apply/index.ts)_

## `templify help [COMMAND]`

Display help for templify.

```
USAGE
  $ templify help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for templify.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.27/src/commands/help.ts)_

## `templify plugins`

List installed plugins.

```
USAGE
  $ templify plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ templify plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/index.ts)_

## `templify plugins add PLUGIN`

Installs a plugin into templify.

```
USAGE
  $ templify plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into templify.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TEMPLIFY_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TEMPLIFY_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ templify plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ templify plugins add myplugin

  Install a plugin from a github url.

    $ templify plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ templify plugins add someuser/someplugin
```

## `templify plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ templify plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ templify plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/inspect.ts)_

## `templify plugins install PLUGIN`

Installs a plugin into templify.

```
USAGE
  $ templify plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into templify.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the TEMPLIFY_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the TEMPLIFY_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ templify plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ templify plugins install myplugin

  Install a plugin from a github url.

    $ templify plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ templify plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/install.ts)_

## `templify plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ templify plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ templify plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/link.ts)_

## `templify plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ templify plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ templify plugins unlink
  $ templify plugins remove

EXAMPLES
  $ templify plugins remove myplugin
```

## `templify plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ templify plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/reset.ts)_

## `templify plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ templify plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ templify plugins unlink
  $ templify plugins remove

EXAMPLES
  $ templify plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/uninstall.ts)_

## `templify plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ templify plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ templify plugins unlink
  $ templify plugins remove

EXAMPLES
  $ templify plugins unlink myplugin
```

## `templify plugins update`

Update installed plugins.

```
USAGE
  $ templify plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.15/src/commands/plugins/update.ts)_

## `templify scan TEMPLATE_DIR`

🔎 Scan the template folder and generate or update the template config file.

```
USAGE
  $ templify scan TEMPLATE_DIR

ARGUMENTS
  TEMPLATE_DIR  [default: .] the template folder to apply

DESCRIPTION
  🔎 Scan the template folder and generate or update the template config file.

EXAMPLES
  $ templify scan .
  Scanned.
```

_See code: [src/commands/scan/index.ts](https://github.com/isdk/templify.js/blob/v0.1.0/src/commands/scan/index.ts)_
<!-- commandsstop -->
