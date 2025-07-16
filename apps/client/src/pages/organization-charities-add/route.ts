import { lazy } from 'react'

export default {
  path: '/organization/charities/create',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'organization',
  title: 'Volunteer Hub | Create Organization Charities'
}
