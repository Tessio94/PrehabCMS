import type { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'
export const isStaff: Access = ({ req }) => ['admin', 'reception'].includes(req.user?.role ?? '')
export const isEditor: Access = ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? '')
export const adminField: FieldAccess = ({ req }) => req.user?.role === 'admin'
export const publishedOrEditor: Access = ({ req }) =>
  ['admin', 'editor'].includes(req.user?.role ?? '') ? true : { _status: { equals: 'published' } }
export const activeOrStaff: Access = ({ req }) => req.user ? true : { active: { equals: true } }
