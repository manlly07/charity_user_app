import { lazy } from 'react'

export default {
  path: '/admin/charities/:id',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'blank',
  title: 'Volunteer Hub | Admin Charities Detail'
}
