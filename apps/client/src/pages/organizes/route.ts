import { lazy } from 'react'

export default {
  path: '/organizes/:id',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'back',
  title: 'Volunteer Hub | Organize'
}
