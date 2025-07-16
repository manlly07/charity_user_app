import { lazy } from 'react'

export default {
  path: '/organization/donations',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'organization',
  title: 'Volunteer Hub | Organization Donations'
}
