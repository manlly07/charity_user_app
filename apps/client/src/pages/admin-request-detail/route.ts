import { lazy } from 'react'

export default {
  path: '/admin/request/:id',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'blank',
  title: 'Volunteer Hub | Admin Request Detail'
}
