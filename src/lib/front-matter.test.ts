import { parseFrontMatter } from './front-matter.js'

describe('parseFrontMatter', () => {
  it('should parse front matter with default delimiter', () => {
    const input = `---
title: Test
date: 2022-01-01
---
This is the body`
    const expectedOutput = {
      data: {
        title: 'Test',
        date: '2022-01-01',
      },
      content: 'This is the body',
    }
    const result = parseFrontMatter(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should parse front matter with default delimiter empty line', () => {
    const input = `

---
title: Test
date: 2022-01-01
---
This is the body`
    const expectedOutput = {
      data: {
        title: 'Test',
        date: '2022-01-01',
      },
      content: 'This is the body',
    }
    const result = parseFrontMatter(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should parse front matter with custom delimiter', () => {
    const input = `+++
title: Test
date: 2022-01-01
+++`
    const expectedOutput = {
      data: {
        title: 'Test',
        date: '2022-01-01',
      },
      content: '',
    }
    const result = parseFrontMatter(input, '+++')
    expect(result).toEqual(expectedOutput)
  })

  it('should return null if no delimiter is found', () => {
    const input = `This is the body`
    const expectedOutput = {data: {}, content: input}
    const result = parseFrontMatter(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should handle empty front matter', () => {
    const input = `---
---
This is the body`
    const expectedOutput = {
      data: {},
      content: 'This is the body',
    }
    const result = parseFrontMatter(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should handle multi lines', () => {
    const input = `---
content: 'hi'
---
This is the body
---
second line`
    const expectedOutput = {
      data: {content: 'hi'},
      content: 'This is the body\n---\nsecond line',
    }
    const result = parseFrontMatter(input)
    expect(result).toEqual(expectedOutput)
  })
})