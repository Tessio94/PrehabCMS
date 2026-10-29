import { APIError, type CollectionConfig } from 'payload'
import { isAdmin, adminField } from '@/lib/access'

export const Users: CollectionConfig = {
  slug: 'users', labels: { singular: 'Korisnik', plural: 'Korisnici' },
  admin: { useAsTitle: 'name', group: 'Upravljanje' },
  auth: {
    maxLoginAttempts: 5, lockTime: 15 * 60 * 1000,
    tokenExpiration: 2 * 60 * 60,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  access: {
    admin: ({ req }) => Boolean(req.user), create: isAdmin, delete: isAdmin,
    read: ({ req }) => req.user?.role === 'admin' ? true : req.user ? { id: { equals: req.user.id } } : false,
    update: ({ req }) => req.user?.role === 'admin' ? true : req.user ? { id: { equals: req.user.id } } : false,
  },
  hooks: { beforeChange: [({ data, req, operation }) => {
    if (operation === 'create' && !req.user && !req.context.seedAdmin) throw new APIError('Prvog administratora kreirajte putem seed skripte.', 403)
    return data
  }] },
  fields: [
    { name: 'name', label: 'Ime', type: 'text', required: true },
    { name: 'role', label: 'Uloga', type: 'select', required: true, defaultValue: 'editor', saveToJWT: true,
      access: { create: adminField, update: adminField },
      options: [{ label: 'Administrator', value: 'admin' }, { label: 'Urednik članaka', value: 'editor' }, { label: 'Recepcija', value: 'reception' }] },
  ],
}
