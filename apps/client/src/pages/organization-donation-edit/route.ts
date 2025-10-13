import { lazy } from 'react'

export default {
  path: '/organization/donations/update/:id',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'organization',
  title: 'Volunteer Hub | Create Organization Donation'
}
