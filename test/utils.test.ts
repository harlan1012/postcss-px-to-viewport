import { describe, expect, it } from 'vitest'
import { DEFAULT_OPTIONS } from '../src/constants'
import { createUnitReplaceFunction, doesDeclarationExist, getViewportUnit, isListedSelector, roundNumberToPrecision, shouldExcludeFile, shouldExcludeSelector, validateMediaQueryParams } from '../src/utils'

describe('utils.ts functions', () => {
  describe('shouldExcludeFile', () => {
    it('should return false if no excludeFiles and includeFiles are empty', () => {
      const options = { ...DEFAULT_OPTIONS }
      expect(shouldExcludeFile(options, 'test.css')).toBe(false)
    })

    it('should return true if file is in excludeFiles', () => {
      const options = { ...DEFAULT_OPTIONS, excludeFiles: ['test.css'] }
      expect(shouldExcludeFile(options, 'test.css')).toBe(true)
    })

    it('should return false if file is not in excludeFiles but in includeFiles', () => {
      const options = { ...DEFAULT_OPTIONS, includeFiles: ['test.css'] }
      expect(shouldExcludeFile(options, 'test.css')).toBe(false)
    })

    it('should return true if file is not in includeFiles', () => {
      const options = { ...DEFAULT_OPTIONS, includeFiles: ['included.css'] }
      expect(shouldExcludeFile(options, 'test.css')).toBe(true)
    })
  })

  describe('shouldExcludeSelector', () => {
    it('should return false if no selectorBlacklist and selectorWhitelist are empty', () => {
      const options = { ...DEFAULT_OPTIONS }
      expect(shouldExcludeSelector(options, '.test')).toBe(false)
    })

    it('should return true if selector is in selectorBlacklist', () => {
      const options = { ...DEFAULT_OPTIONS, selectorBlacklist: ['.test'] }
      expect(shouldExcludeSelector(options, '.test')).toBe(true)
    })

    it('should return false if selector is not in selectorBlacklist but in selectorWhitelist', () => {
      const options = { ...DEFAULT_OPTIONS, selectorWhitelist: ['.test'] }
      expect(shouldExcludeSelector(options, '.test')).toBe(false)
    })

    it('should return true if selector is not in selectorWhitelist', () => {
      const options = { ...DEFAULT_OPTIONS, selectorWhitelist: ['.included'] }
      expect(shouldExcludeSelector(options, '.test')).toBe(true)
    })
  })

  describe('isListedSelector', () => {
    it('should return true if selector is in list', () => {
      const list = ['.test', /^\.regex-/]
      expect(isListedSelector('.test', list)).toBe(true)
      expect(isListedSelector('.regex-test', list)).toBe(true)
    })

    it('should return false if selector is not in list', () => {
      const list = ['.included', /^\.regex-/]
      expect(isListedSelector('.test', list)).toBe(false)
    })
  })

  describe('getViewportUnit', () => {
    it('should return viewportUnit for non-font properties', () => {
      const options = { ...DEFAULT_OPTIONS }
      expect(getViewportUnit(options, '', 'px')).toBe('vw')
    })

    it('should return fontViewportUnit for font properties', () => {
      const options = { ...DEFAULT_OPTIONS }
      expect(getViewportUnit(options, '', 'font')).toBe('vw')
    })
  })

  describe('roundNumberToPrecision', () => {
    it('should round number to specified precision', () => {
      expect(roundNumberToPrecision(1.234567, 2)).toBe(1.23)
      expect(roundNumberToPrecision(1.234567, 4)).toBe(1.2346)
    })
  })

  describe('createUnitReplaceFunction', () => {
    it('should return a function that converts pixel values to target unit', () => {
      const options = { ...DEFAULT_OPTIONS, minPixelValue: 1, unitPrecision: 2 }
      const replaceFunction = createUnitReplaceFunction(options, 'vw', 375)
      expect(replaceFunction('10px', '10')).toBe('2.67vw')
      expect(replaceFunction('0px', '0')).toBe('0px')
      expect(replaceFunction('0.5px', '0.5')).toBe('0.5px')
    })
  })

  describe('doesDeclarationExist', () => {
    it('should return true if declaration exists', () => {
      const declarations = [{ prop: 'width', value: '100px' }] as any
      expect(doesDeclarationExist(declarations, 'width', '100px')).toBe(true)
    })

    it('should return false if declaration does not exist', () => {
      const declarations = [{ prop: 'height', value: '100px' }] as any
      expect(doesDeclarationExist(declarations, 'width', '100px')).toBe(false)
    })
  })

  describe('validateMediaQueryParams', () => {
    it('should return true if params are valid', () => {
      expect(validateMediaQueryParams('', true)).toBe(true)
      expect(validateMediaQueryParams('screen and (min-width: 600px)', true)).toBe(true)
    })

    it('should return false if params are invalid', () => {
      expect(validateMediaQueryParams('screen and (min-width: 600px)', false)).toBe(false)
    })
  })
})
