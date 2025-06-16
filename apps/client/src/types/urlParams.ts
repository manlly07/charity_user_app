export type ParamValue = string | number | boolean | null | undefined
export type ParamsObject = Record<string, ParamValue>

export interface UrlParamsOptions {
  trackParams?: string[]
  replace?: boolean
}

export interface SetParamsOptions {
  replace?: boolean
  merge?: boolean
}

export interface NavigateWithParamsOptions extends SetParamsOptions {
  replace?: boolean
  merge?: boolean
}

export interface UseUrlParamsReturn<T extends string = string> {
  params: Record<T, string>
  searchParams: URLSearchParams
  setParam: (key: T, value: ParamValue, options?: SetParamsOptions) => void
  setParams: (newParams: Partial<Record<T, ParamValue>>, options?: SetParamsOptions) => void
  getParam: <D extends string = ''>(key: T, defaultValue?: D) => string | D
  hasParam: (key: T) => boolean
  removeParams: (paramNames: T | T[], options?: Pick<SetParamsOptions, 'replace'>) => void
  clearParams: (options?: Pick<SetParamsOptions, 'replace'>) => void
  navigateWithParams: (
    path: string,
    newParams?: Partial<Record<T, ParamValue>>,
    options?: NavigateWithParamsOptions
  ) => void
  getUrlWithParams: (newParams: Partial<Record<T, ParamValue>>, merge?: boolean) => string
}
