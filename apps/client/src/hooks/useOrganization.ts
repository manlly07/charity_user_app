import { RequestService } from '@/services'
import { useMemo } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
const useOrganization = (id: number, config?: SWRConfiguration) => {
  const { data, isLoading, error } = useSWR(
    `organization/${id}`,
    () => RequestService.getById(id),
    config
  )

  const organization = useMemo(() => {
    if (!data) return null
    return data[0]
  }, [data])

  return {
    organization,
    isLoading,
    error
  }
}

export default useOrganization
