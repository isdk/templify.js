Templify: Instantly convert project into template
=====

Turn any project into a reusable template in seconds—keep your structure, replace variables smartly, and ship templates that just work.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@isdk/templify.svg)](https://npmjs.org/package/@isdk/templify)
[![Downloads/week](https://img.shields.io/npm/dw/@isdk/templify.svg)](https://npmjs.org/package/@isdk/templify)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

## Install templify

<!-- usage -->
```sh-session
$ npm install -g @isdk/templify
$ templify COMMAND
running command...
$ templify (--version)
@isdk/templify/0.5.0 linux-x64 node-v20.19.4
$ templify --help [COMMAND]
USAGE
  $ templify COMMAND
...
```
<!-- usagestop -->

## Turn project into template

Navigate to your project directory and mark the parts of the relevant files that need to be replaced with template placeholders using `{{VAR}}`. Then, run the `templify scan` command to initialize the template variable file.

For example, modify the `package.json` file as follows:

```js
{
  "name": "{{name}}",
  "description": "{{description}}",
  "version": "{{version}}",
  "author": "{{author}}",
  "bugs": "{{githubUrl}}/issues",
  "homepage": "{{githubUrl}}",
  "keywords": {{keywords | tojson}},
  ...
}
```

Run the templify scan command in the project directory:

```bash
templify scan
found template file: package.json
Scanned. found 1 template files
Saved ./.templify.yaml
```

Open the generated `.templify.yaml` file and make some edits:

```yaml
files:
  - package.json
parameters:
  name:
    type: string
    default: my-package-name
    title: Package Name
    description: Enter your project name
  description:
    type: string
    title: Package Description
    description: Enter your project description
  version:
    title: Package Version
    type: string
    default: 0.1.0
  author:
    type: string
  githubUrl:
    type: string
    default: https://github.com
  keywords:
    type: array
    description: Enter your project keywords
```

Note:

* The default template format is a simplified version of `jinja2`.
* The files or folders in the `.gitignore` will be ignored.

## Apply template data configuration to the template folder directly

Ok, now you can run `templify apply` command to apply the template data configuration to the template folder directly:

```bash
templify apply
╭─ Templify: Instantly convert project into template ──────────────────────────⊱
│
◆  Package Name
│  Enter your project name
│  my-name
│
◆  Package Description
│  Enter your project description
│  my-description
│
◆  Package Version
│  0.1.0
│
◆  author
│  Riceball LEE @snowyu
│
◆  githubUrl
│  https://github.com
│

╭─ keywords ───────────────────────────────────────────────────────────────────⊱
│
◆  Add keywords[1] to array (empty to finish)
│  good
│
◆  Add keywords[2] to array (empty to finish)
│  better
│
◆  Add keywords[3] to array (empty to finish)
│  best
│
◆  Add keywords[4] to array (empty to finish)
│
│
│  keywords
╰──────────────────────────────────────────────────────────────────────────────⊱

│  Templify: Instantly convert project into template
╰──────────────────────────────────────────────────────────────────────────────⊱

skip: test/fixture/README.md
apply template: test/fixture/package.json done.
Appied. Enjoy your project at .
```

Note:

* By default, the interactive mode is enabled.
* Use the `--no-interactive` flag to disable interactive mode. If a `.templify-data.yaml` file exists in the template folder, it will apply the data from that file; otherwise, it will generate a `.templify-data.yaml` data file in the template folder.
* Use the `-d your-data-file.yaml` flag to specify the data file to apply.

# Commands

<!-- commands -->
* [`templify TEMPLATE_DIR [DATA]`](#templify-template_dir-data)
* [`templify apply TEMPLATE_DIR [DATA]`](#templify-apply-template_dir-data)
* [`templify scan TEMPLATE_DIR`](#templify-scan-template_dir)

## `templify TEMPLATE_DIR [DATA]`

🚀 Apply template data configuration etc to the template folder directly. This is the default command to run.

```
USAGE
  $ templify  TEMPLATE_DIR [DATA] [-d <value>] [-i] [-n]

ARGUMENTS
  TEMPLATE_DIR  [default: .] the template folder to apply
  DATA          the json data to apply. see also `--data data-file-path`

FLAGS
  -d, --data=<value>      the data file to apply. see also DATA argument
  -i, --[no-]interactive  interactive mode
  -n, --dryRun            dry run mode

DESCRIPTION
  🚀 Apply template data configuration etc to the template folder directly. This is the default command to run.

ALIASES
  $ templify 

EXAMPLES
  $ templify  .
  Appied. Enjoy your project at "."
```

## `templify apply TEMPLATE_DIR [DATA]`

🚀 Apply template data configuration etc to the template folder directly. This is the default command to run.

```
USAGE
  $ templify apply TEMPLATE_DIR [DATA] [-d <value>] [-i] [-n]

ARGUMENTS
  TEMPLATE_DIR  [default: .] the template folder to apply
  DATA          the json data to apply. see also `--data data-file-path`

FLAGS
  -d, --data=<value>      the data file to apply. see also DATA argument
  -i, --[no-]interactive  interactive mode
  -n, --dryRun            dry run mode

DESCRIPTION
  🚀 Apply template data configuration etc to the template folder directly. This is the default command to run.

ALIASES
  $ templify 

EXAMPLES
  $ templify apply .
  Appied. Enjoy your project at "."
```

_See code: [src/commands/apply/index.ts](https://github.com/isdk/templify.js/blob/v0.5.0/src/commands/apply/index.ts)_

## `templify scan TEMPLATE_DIR`

🔎 Scan the template folder and generate or update the template config file(".templify.yaml").

```
USAGE
  $ templify scan TEMPLATE_DIR [-f <value>] [-n]

ARGUMENTS
  TEMPLATE_DIR  [default: .] the template folder to scan

FLAGS
  -f, --files=<value>  the file patterns to scan, split by comma
  -n, --dryRun         dry run mode

DESCRIPTION
  🔎 Scan the template folder and generate or update the template config file(".templify.yaml").

EXAMPLES
  $ templify scan .
  Scanned.
```

_See code: [src/commands/scan/index.ts](https://github.com/isdk/templify.js/blob/v0.5.0/src/commands/scan/index.ts)_
<!-- commandsstop -->
