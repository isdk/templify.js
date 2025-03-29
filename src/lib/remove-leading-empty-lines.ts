/**
 * Removes all leading empty lines or "#" comments line from the given string.
 *
 * This function trims any sequence of empty lines that appear at the beginning
 * of the input string. It accounts for different newline characters including
 * '\n', '\r\n', and also considers lines that contain only whitespace characters.
 *
 * @param text - The string from which to remove leading empty lines.
 * @returns The string with leading empty lines removed.
 *
 * @example
 * const sampleText = '# This is a comment\n\nHello, world!\n';
 * const cleanedText = removeLeadingEmptyLines(sampleText);
 * // cleanedText is now 'Hello, world!\n'
 */
export function removeLeadingEmptyLines(text: string): string {
  // Regular expression to match empty lines, including lines with only whitespace characters and pure line breaks
  const emptyLineRegex = /^\s*(#[^\r\n]*)?[\r\n]+/;
  let match;
  // Iterate through the string, removing leading empty lines until a non-empty line is encountered
  while ((match = emptyLineRegex.exec(text)) !== null) {
    // Remove the matched empty line from the text
      text = text.substring(match[0].length);
      // Stop when the text no longer starts with a newline character
      if (!text.startsWith('\n') && !text.startsWith('\r') && !text.trimStart().startsWith('#'))  break;
  }
  return text;
}
