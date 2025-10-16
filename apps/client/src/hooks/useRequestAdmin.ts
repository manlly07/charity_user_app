import { RequestStatus } from '@/enum'
import RequestAminService from '@/services/request.admin.service'
import { RootState } from '@/stores/store'
import { useSelector } from 'react-redux'
import useSWR from 'swr'

export enum EAccountStatus {
  ACTIVE,
  INACTIVE,
  DELETED
}

export enum ERequestType {
  ORGANIZATION_REGISTRATION,
  OTHER_REQUEST_TYPE
}

export interface RequestListResponse {
  id: number
  requestType: ERequestType
  status: RequestStatus
  denyReason?: string
  createdAt: string // LocalDateTime -> ISO string
  updatedAt: string

  // Organization info
  organizationId: number
  organizationName: string
  organizationDescription?: string
  organizationContact?: string
  organizationAddress?: string

  // Volunteer info
  volunteerId: number
  volunteerFullName: string
  volunteerContact?: string
  volunteerEmail: string
}

type CharityFilters = { search?: string }

export function useRequestAdmin(filters?: { search?: string }) {
  const { user } = useSelector((state: RootState) => state.auth)

  const key: [string, CharityFilters?] | null = user ? [`/admin/request`, filters] : null

  const { data, error, isLoading, mutate } = useSWR(key, ([_url, f]) =>
    user ? RequestAminService.getAllRequests(f as CharityFilters) : Promise.resolve([])
  )

  return {
    requests: error || !data ? [] : (data as RequestListResponse[]),
    isLoading,
    isError: error,
    mutate
  }
}
