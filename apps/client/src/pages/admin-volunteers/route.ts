import { lazy } from 'react'

export default {
  path: '/admin/volunteer',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'admin',
  title: 'Volunteer Hub | Admin Volunteers'
}
