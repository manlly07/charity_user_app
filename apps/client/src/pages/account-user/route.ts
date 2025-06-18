import { lazy } from 'react'

export default {
  path: '/account',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'profile',
  title: 'Volunteer Hub | Account'
}
