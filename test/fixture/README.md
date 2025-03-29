---
files:
  - "**/package.json"
parameters:
  name:
    type: string
    default: my-name
    title: Package Name
    description: Enter your project name
  description:
    type: string
    default: my-description
    title: Package Description
    description: Enter your project description
  version:
    title: Package Version
    type: string
    default: 0.1.0
  author:
    type: string
    default: Riceball LEE @snowyu
  githubUrl:
    type: string
    default: https://github.com
  keywords:
    type: array
    description: Enter your project keywords
---
