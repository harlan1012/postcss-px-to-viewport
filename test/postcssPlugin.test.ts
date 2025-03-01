import type { AtRule } from 'postcss'
import type Result_ from 'postcss/lib/result'
import type { Options } from '../src/types'
import { Declaration, Root, Rule } from 'postcss'
import { describe, expect, it } from 'vitest'
import { DEFAULT_OPTIONS } from '../src/constants'
import { handleLandscapeMode, processDeclarations } from '../src/postcssPlugin'
import { shouldExcludeFile, shouldExcludeSelector } from '../src/utils'

describe('selector whitelist and blacklist', () => {
  it('should handle empty whitelist and blacklist', () => {
    const options = { ...DEFAULT_OPTIONS }
    expect(shouldExcludeSelector(options, '.test')).toBe(false)
  })

  it('should exclude selectors in blacklist', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      selectorBlacklist: ['ignore', /^\.ignore-/],
    }
    expect(shouldExcludeSelector(options, '.ignore-this')).toBe(true)
    expect(shouldExcludeSelector(options, 'button.ignore')).toBe(true)
    expect(shouldExcludeSelector(options, '.normal')).toBe(false)
  })

  it('should only include selectors in whitelist when specified', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      selectorWhitelist: ['convert', /^\.convert-/],
    }
    expect(shouldExcludeSelector(options, '.convert-this')).toBe(false)
    expect(shouldExcludeSelector(options, 'button.convert')).toBe(false)
    expect(shouldExcludeSelector(options, '.normal')).toBe(true)
  })

  it('should handle both whitelist and blacklist', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      selectorBlacklist: ['ignore', /^\.ignore-/],
      selectorWhitelist: ['convert', /^\.convert-/],
    }
    // Blacklist takes precedence
    expect(shouldExcludeSelector(options, '.ignore-convert')).toBe(true)
    // Then check whitelist
    expect(shouldExcludeSelector(options, '.convert-this')).toBe(false)
    expect(shouldExcludeSelector(options, '.normal')).toBe(true)
  })

  it('should handle regex patterns correctly', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      selectorWhitelist: [/^\.prefix-/, /suffix$/],
    }
    expect(shouldExcludeSelector(options, '.prefix-test')).toBe(false)
    expect(shouldExcludeSelector(options, '.test-suffix')).toBe(false)
    expect(shouldExcludeSelector(options, '.normal')).toBe(true)
  })
})

describe('shouldExcludeFile', () => {
  it('should return true if the file is in the exclude list', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      excludeFiles: ['exclude.js'],
      includeFiles: [],
    }
    expect(shouldExcludeFile(options, 'path/to/exclude.js')).toBe(true)
  })

  it('should return false if the file is not in the exclude list', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      excludeFiles: ['exclude.js'],
      includeFiles: [],
    }
    expect(shouldExcludeFile(options, 'path/to/include.js')).toBe(false)
  })

  it('should return true if the file is in the include list and includeFiles is not empty', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      excludeFiles: [],
      includeFiles: ['include.js'],
    }
    expect(shouldExcludeFile(options, 'path/to/include.js')).toBe(false)
  })

  it('should return false if the file is not in the include list and includeFiles is not empty', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      excludeFiles: [],
      includeFiles: ['include.js'],
    }
    expect(shouldExcludeFile(options, 'path/to/exclude.js')).toBe(true)
  })
})

describe('shouldExcludeSelector', () => {
  it('should return true if the selector is in the blacklist', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      selectorBlacklist: ['.ignore', /^\.ignore-/],
      selectorWhitelist: [],
    }
    expect(shouldExcludeSelector(options, '.ignore-this')).toBe(true)
  })

  it('should return false if the selector is not in the blacklist', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      selectorBlacklist: ['.ignore', /^\.ignore-/],
      selectorWhitelist: [],
    }
    expect(shouldExcludeSelector(options, '.normal')).toBe(false)
  })

  it('should return false if the selector is in the whitelist', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      selectorBlacklist: ['.ignore', /^\.ignore-/],
      selectorWhitelist: ['.convert', /^\.convert-/],
    }
    expect(shouldExcludeSelector(options, '.convert-this')).toBe(false)
  })

  it('should return true if the selector is not in the whitelist and whitelist is not empty', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      selectorBlacklist: ['.ignore', /^\.ignore-/],
      selectorWhitelist: ['.convert', /^\.convert-/],
    }
    expect(shouldExcludeSelector(options, '.normal')).toBe(true)
  })
})

describe('processDeclarations', () => {
  it('should process declarations and replace units', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      unitType: 'px',
      allowedProperties: ['*'],
      replaceRules: true,
    } as Options
    const css = new Root()
    const rule = new Rule({ selector: '.test' })
    const declaration = new Declaration({ prop: 'width', value: '375px' })
    rule.append(declaration)
    css.append(rule)

    processDeclarations(rule, options, 'path/to/file.css', () => true, /"[^"]+"|'[^']+'|url\([^)]+\)|(\d+(?:\.\d+)?|\.\d+)px/g, {})

    expect(declaration.value).toBe('100vw')
  })

  it('should not process declarations if they do not match the unit type or are not allowed properties', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      unitType: 'px',
      allowedProperties: ['*'],
      replaceRules: true,
    } as Options
    const css = new Root()
    const rule = new Rule({ selector: '.test' })
    const declaration = new Declaration({ prop: 'height', value: '100em' })
    rule.append(declaration)
    css.append(rule)

    processDeclarations(rule, options, 'path/to/file.css', () => true, /"[^"]+"|'[^']+'|url\([^)]+\)|(\d+(?:\.\d+)?|\.\d+)px/g, {} as Result_)

    expect(declaration.value).toBe('100em')
  })
})

describe('handleLandscapeMode', () => {
  it('should process declarations for landscape mode', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      unitType: 'px',
      landscapeUnit: 'vw',
      landscapeViewportWidth: 568,
      enableLandscape: true,
    } as Options
    const css = new Root()
    const rule = new Rule({ selector: '.test' })
    const declaration = new Declaration({ prop: 'width', value: '100px' })
    rule.append(declaration)
    css.append(rule)

    handleLandscapeMode(css, rule, options, 'path/to/file.css', () => true, /"[^"]+"|'[^']+'|url\([^)]+\)|(\d+(?:\.\d+)?|\.\d+)px/g)

    // 检查是否生成了媒体查询规则
    const mediaQueries = css.nodes.filter(node => node.type === 'atrule' && node.name === 'media')
    expect(mediaQueries.length).toBeGreaterThan(0)
    expect((mediaQueries[0] as AtRule).params).toBe('(orientation: landscape)')
  })

  it('should not process declarations if landscape mode is not enabled', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      unitType: 'px',
      landscapeUnit: 'vw',
      landscapeViewportWidth: 568,
      enableLandscape: false,
    } as Options
    const css = new Root()
    const rule = new Rule({ selector: '.test' })
    const declaration = new Declaration({ prop: 'width', value: '100px' })
    rule.append(declaration)
    css.append(rule)

    handleLandscapeMode(css, rule, options, 'path/to/file.css', () => true, /"[^"]+"|'[^']+'|url\([^)]+\)|(\d+(?:\.\d+)?|\.\d+)px/g)

    // 检查没有生成媒体查询规则
    const mediaQueries = css.nodes.filter(node => node.type === 'atrule' && node.name === 'media')
    expect(mediaQueries.length).toBe(0)
  })
})
