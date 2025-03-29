import { removeLeadingEmptyLines } from './remove-leading-empty-lines'

describe('removeLeadingEmptyLines', () => {
  it('should remove leading empty lines', () => {
    const input = `

    这是一个示例文本，
    它前面有若干空行。
    `;
    const expectedOutput = '    这是一个示例文本，\n    它前面有若干空行。\n    ';
    expect(removeLeadingEmptyLines(input)).toBe(expectedOutput);
  });

  it('should handle strings with no leading empty lines', () => {
    const input = '没有空行的文本';
    const expectedOutput = '没有空行的文本';
    expect(removeLeadingEmptyLines(input)).toBe(expectedOutput);
  });

  it('should handle strings with only empty lines', () => {
    const input = '   \n  \n';
    const expectedOutput = '';
    expect(removeLeadingEmptyLines(input)).toBe(expectedOutput);
  });

  it('should correctly handle different line endings', () => {
    const input = '\r\n\r\n内容开始';
    const expectedOutput = '内容开始';
    expect(removeLeadingEmptyLines(input)).toBe(expectedOutput);
  });

  it('should remove line comments too', () => {
    const input = '# this is a comments one\n\r# this is a comments 2\n\n内容开始1\n\n内容开始';
    const expectedOutput = '内容开始1\n\n内容开始';
    expect(removeLeadingEmptyLines(input)).toBe(expectedOutput);
  });

  it('should not remove line comments', () => {
    const input = '---\n# this is a comments one\n\r# this is a comments 2\n\n内容开始1\n\n内容开始';
    const expectedOutput = input;
    expect(removeLeadingEmptyLines(input)).toBe(expectedOutput);
  });

});
