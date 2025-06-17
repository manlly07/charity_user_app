import { lazy } from 'react'

export default {
  path: '/donate/:id',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'back',
  title: 'Volunteer Hub | Donate'
}
