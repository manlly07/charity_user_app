import OrganizationService from '@/services/organization.service'
import { RootState } from '@/stores/store'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

export enum EAccountStatus {
  ACTIVE,
  INACTIVE,
  DELETED
}

export interface OrganizationListResponse {
  id: number
  organizationName: string
  description?: string
  certificate?: string
  logo?: string
  createdAt: string // LocalDateTime chuyển sang string ISO
  updatedAt: string
  isDeleted: boolean

  // Owner information
  ownerName: string
  ownerEmail: string
  ownerContact?: string
  ownerStatus: EAccountStatus
  ownerIsActive: boolean
  ownerIsBanned: boolean
}

type CharityFilters = { search?: string }

export function useOrganizationAdmin(filters?: { search?: string }) {
  const { user } = useSelector((state: RootState) => state.auth)

  const key: [string, CharityFilters?] | null = user?.organizationId
    ? [`/admin/organizations`, filters]
    : null

  const { data, error, isLoading, mutate } = useSWR(key, ([url, f]) =>
    user?.organizationId
      ? OrganizationService.getAllOrganizations(f as CharityFilters)
      : Promise.resolve([])
  )

  return {
    organizations: error || !data ? [] : (data as OrganizationListResponse[]),
    isLoading,
    isError: error,
    mutate
  }
}
