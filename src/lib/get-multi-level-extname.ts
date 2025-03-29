import path from 'path'

/**
 * Retrieves multi-level file extension
 * @param filename The file name
 * @param level The level, default is 1, indicating the number of extension levels to retrieve
 * @returns Returns a concatenated string of multiple extensions, or an empty string if no extension is found
 */
export function getMultiLevelExtname(filename: string, level: number = 1) {
  let result = '' // Initialize the result string for storing extensions
  while (level--) { // Decrement level and loop until the specified level is reached
    const extname = path.extname(filename) // Get the current file's extension
    if (extname) {
      result = extname + result // Prepend the current extension to the result string
      filename = path.basename(filename, extname) // Update filename by removing the obtained extension
    } else {
      break // If no extension exists, exit the loop
    }
  }
  return result // Return the concatenated extension string
}
