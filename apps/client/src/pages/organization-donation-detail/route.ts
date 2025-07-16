import { lazy } from 'react'

export default {
  path: '/organization/donations/:id',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'organization',
  title: 'Volunteer Hub | Organization Donation Detail'
}
