import { lazy } from 'react'

export default {
  path: '/admin/organization/:id',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'blank',
  title: 'Volunteer Hub | Admin Organization Detail'
}
