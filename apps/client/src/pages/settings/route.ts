import { lazy } from 'react'

export default {
  path: '/settings',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'profile',
  title: 'Volunteer Hub | Settings'
}
