import { globMatch } from '@isdk/glob';
import path from 'path';

export function glob(filepath: string, pattern: string[], rootDir?: string) {
  if (rootDir) {
    filepath = path.relative(rootDir, filepath)
  }
  return globMatch(filepath, pattern)
}
