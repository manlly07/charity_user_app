import type { ParamValue, ParamsObject } from '../types/urlParams'

const paramValueToString = (value: ParamValue): string => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'boolean') return value.toString()
  if (typeof value === 'number') return value.toString()
  return String(value)
}

export const mergeSearchParams = (
  searchParams: URLSearchParams,
  newParams: ParamsObject
): URLSearchParams => {
  const merged = new URLSearchParams(searchParams)

  Object.entries(newParams).forEach(([key, value]) => {
    const stringValue = paramValueToString(value)
    if (stringValue !== '') {
      merged.set(key, stringValue)
    } else {
      merged.delete(key)
    }
  })

  return merged
}

export const removeFromSearchParams = (
  searchParams: URLSearchParams,
  paramNames: string | string[]
): URLSearchParams => {
  const updated = new URLSearchParams(searchParams)
  const paramsToRemove = Array.isArray(paramNames) ? paramNames : [paramNames]

  paramsToRemove.forEach((param) => {
    updated.delete(param)
  })

  return updated
}
