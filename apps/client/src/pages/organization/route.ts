import { lazy } from 'react'

export default {
  path: '/organization/account',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'organization',
  title: 'Volunteer Hub | Organization Account'
}
