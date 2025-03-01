import { describe, expect, it } from 'vitest'
import { getUnitRegexp } from '../src/utils'

describe('getUnitRegexp', () => {
  it('should match numeric values with px unit', () => {
    const regexp = getUnitRegexp('px')
    const testString = '10px 20px 30px'
    const matches = testString.match(regexp)
    expect(matches).toEqual(['10px', '20px', '30px'])
  })

  it('should match numeric values with em unit', () => {
    const regexp = getUnitRegexp('em')
    const testString = '1em 2.5em 3.75em'
    const matches = testString.match(regexp)
    expect(matches).toEqual(['1em', '2.5em', '3.75em'])
  })

  it('should match numeric values with vw unit', () => {
    const regexp = getUnitRegexp('vw')
    const testString = '50vw 75vw 100vw'
    const matches = testString.match(regexp)
    expect(matches).toEqual(['50vw', '75vw', '100vw'])
  })

  it('should not match values without the specified unit', () => {
    const regexp = getUnitRegexp('px')
    const testString = '10em 20% 30vh'
    const matches = testString.match(regexp)
    expect(matches).toBeNull()
  })

  it('should match numeric values with mixed content', () => {
    const regexp = getUnitRegexp('px')
    const testString = 'margin: 10px 20px; font-size: 16px;'
    const matches = testString.match(regexp)
    expect(matches).toEqual(['10px', '20px', '16px'])
  })
})
