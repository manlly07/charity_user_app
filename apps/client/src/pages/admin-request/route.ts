import { lazy } from 'react'

export default {
  path: '/admin/requests',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'admin',
  title: 'Volunteer Hub | Admin Request'
}
