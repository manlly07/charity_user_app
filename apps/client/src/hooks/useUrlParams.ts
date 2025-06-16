import { mergeSearchParams, removeFromSearchParams } from '@/utils/urlParams'
import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import type {
  NavigateWithParamsOptions,
  ParamsObject,
  ParamValue,
  SetParamsOptions,
  UrlParamsOptions,
  UseUrlParamsReturn
} from '../types/urlParams'

/**
 * Custom hook để quản lý URL search parameters với React Router và TypeScript
 */
export const useUrlParams = <T extends string = string>(
  options: UrlParamsOptions = {}
): UseUrlParamsReturn<T> => {
  const { trackParams = [], replace: defaultReplace = false } = options
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Get params object từ searchParams với type safety
  const params = useMemo(() => {
    const paramsObj = {} as Record<T, string>

    if (trackParams.length > 0) {
      // Chỉ get những params được chỉ định
      trackParams.forEach((name) => {
        paramsObj[name as T] = searchParams.get(name) || ''
      })
    } else {
      // Get tất cả params
      for (const [key, value] of searchParams.entries()) {
        paramsObj[key as T] = value
      }
    }

    return paramsObj
  }, [searchParams, trackParams])

  // Set multiple params
  const setParams = useCallback(
    (newParams: Partial<Record<T, ParamValue>>, options: SetParamsOptions = {}) => {
      const { replace = defaultReplace, merge = true } = options

      if (merge) {
        const merged = mergeSearchParams(searchParams, newParams as ParamsObject)
        setSearchParams(merged, { replace })
      } else {
        // Replace all params
        const paramsObj: ParamsObject = {}
        Object.entries(newParams).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            paramsObj[key] = String(value)
          }
        })
        setSearchParams(new URLSearchParams(paramsObj as Record<string, string>), { replace })
      }
    },
    [searchParams, setSearchParams, defaultReplace]
  )

  // Set single param
  const setParam = useCallback(
    (key: T, value: ParamValue, options: SetParamsOptions = {}) => {
      setParams({ [key]: value } as Partial<Record<T, ParamValue>>, options)
    },
    [setParams]
  )

  // Get single param với default value và type safety
  const getParam = useCallback(
    <D extends string = ''>(key: T, defaultValue?: D): string | D => {
      const value = searchParams.get(key as string)
      return (value || defaultValue) as string | D
    },
    [searchParams]
  )

  // Check xem param có tồn tại và có giá trị không
  const hasParam = useCallback(
    (key: T): boolean => {
      return searchParams.has(key as string) && searchParams.get(key as string) !== ''
    },
    [searchParams]
  )

  // Remove params
  const removeParams = useCallback(
    (paramNames: T | T[], options: Pick<SetParamsOptions, 'replace'> = {}) => {
      const { replace = defaultReplace } = options
      const updated = removeFromSearchParams(
        searchParams,
        Array.isArray(paramNames) ? (paramNames as string[]) : [paramNames as string]
      )
      setSearchParams(updated, { replace })
    },
    [searchParams, setSearchParams, defaultReplace]
  )

  // Clear all params
  const clearParams = useCallback(
    (options: Pick<SetParamsOptions, 'replace'> = {}) => {
      const { replace = defaultReplace } = options
      setSearchParams(new URLSearchParams(), { replace })
    },
    [setSearchParams, defaultReplace]
  )

  // Navigate với params
  const navigateWithParams = useCallback(
    (
      path: string,
      newParams: Partial<Record<T, ParamValue>> = {},
      options: NavigateWithParamsOptions = {}
    ) => {
      const { replace = false, merge = true } = options
      const searchParamsToUse = merge
        ? mergeSearchParams(searchParams, newParams as ParamsObject)
        : new URLSearchParams(newParams as Record<string, string>)

      navigate(`${path}?${searchParamsToUse.toString()}`, { replace })
    },
    [navigate, searchParams]
  )

  // Get current URL với updated params (không navigate)
  const getUrlWithParams = useCallback(
    (newParams: Partial<Record<T, ParamValue>>, merge = true): string => {
      const searchParamsToUse = merge
        ? mergeSearchParams(searchParams, newParams as ParamsObject)
        : new URLSearchParams(newParams as Record<string, string>)

      return `${location.pathname}?${searchParamsToUse.toString()}`
    },
    [location.pathname, searchParams]
  )

  return {
    params,
    searchParams,
    setParam,
    setParams,
    getParam,
    hasParam,
    removeParams,
    clearParams,
    navigateWithParams,
    getUrlWithParams
  }
}
