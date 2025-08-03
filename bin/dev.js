#!/usr/bin/env -S npx --node-options='--trace-warnings --no-warnings=ExperimentalWarning' tsx
// #!/usr/bin/env -S node --loader ts-node/esm --disable-warning=ExperimentalWarning

import {execute} from '@oclif/core'

await execute({development: true, dir: import.meta.url})
