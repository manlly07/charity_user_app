import { lazy } from 'react'

export default {
  path: '/organization/settings',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'organization',
  title: 'Volunteer Hub | Organization Settings'
}
