import { readdir } from 'fs/promises';
import { type Dirent } from 'fs';
import path from 'path';

export async function traverseFolder(directoryPath: string, fileHandler: (filePath: string, entry: Dirent) => void|Promise<void>) {
  const files = await readdir(directoryPath, { withFileTypes: true, recursive: true });

  for (const entry of files) {
    const filePath = path.join(directoryPath, entry.name);
    await fileHandler(filePath, entry);
  }
}
