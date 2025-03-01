import { describe, expect, it } from 'vitest'
import { createPropertiesListMatcher } from '../src/utils/prop-list-matcher'

describe('createPropertiesListMatcher', () => {
  it('should match exact properties', () => {
    const matcher = createPropertiesListMatcher(['prop1', 'prop2'])
    expect(matcher('prop1')).toBe(true)
    expect(matcher('prop2')).toBe(true)
    expect(matcher('prop3')).toBe(false)
  })

  it('should match properties containing a substring', () => {
    const matcher = createPropertiesListMatcher(['*sub*'])
    expect(matcher('substring')).toBe(true)
    expect(matcher('presubfix')).toBe(true)
    expect(matcher('noubhere')).toBe(false)
  })

  it('should match properties starting with a substring', () => {
    const matcher = createPropertiesListMatcher(['start*'])
    expect(matcher('startHere')).toBe(true)
    expect(matcher('startThere')).toBe(true)
    expect(matcher('noStart')).toBe(false)
  })

  it('should match properties ending with a substring', () => {
    const matcher = createPropertiesListMatcher(['*end'])
    expect(matcher('theend')).toBe(true)
    expect(matcher('happyend')).toBe(true)
    expect(matcher('noEndHere')).toBe(false)
  })

  it('should exclude exact properties', () => {
    const matcher = createPropertiesListMatcher(['*', '!exclude'])
    expect(matcher('include')).toBe(true)
    expect(matcher('exclude')).toBe(false)
  })

  it('should exclude properties containing a substring', () => {
    const matcher = createPropertiesListMatcher(['*', '!*sub*'])
    expect(matcher('substring')).toBe(false)
    expect(matcher('presubfix')).toBe(false)
    expect(matcher('nosubhere')).toBe(false)
    expect(matcher('noubhere')).toBe(true)
  })

  it('should exclude properties starting with a substring', () => {
    const matcher = createPropertiesListMatcher(['*', '!start*'])
    expect(matcher('startHere')).toBe(false)
    expect(matcher('startThere')).toBe(false)
    expect(matcher('noStart')).toBe(true)
  })

  it('should exclude properties ending with a substring', () => {
    const matcher = createPropertiesListMatcher(['*', '!*end'])
    expect(matcher('theend')).toBe(false)
    expect(matcher('happyend')).toBe(false)
    expect(matcher('noEndHere')).toBe(true)
  })

  it('should match all properties when only wildcard is provided', () => {
    const matcher = createPropertiesListMatcher(['*'])
    expect(matcher('anyProp')).toBe(true)
    expect(matcher('anotherProp')).toBe(true)
  })
})
