import { lazy } from 'react'

export default {
  path: '/donation-history',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'profile',
  title: 'Volunteer Hub | Donation History'
}
