import { lazy } from 'react'

export default {
  path: '/charity-history',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'profile',
  title: 'Volunteer Hub | Charity History'
}
