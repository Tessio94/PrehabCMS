import { z } from 'zod'
export const bookingSchema = z.object({
  location: z.enum(['zadar','biograd']), service: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), time: z.string().regex(/^\d{2}:(00|30)$/),
  duration: z.union([z.literal(30), z.literal(60)]),
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30).regex(/^\+?[\d\s()/.-]+$/),
  email: z.union([z.email().max(254),z.literal('')]).optional(),
  privacyAcknowledged: z.literal(true), privacyVersion: z.string().min(1).max(50),
  website: z.string().max(0).optional(), requestKey: z.uuid(),
}).strict()
export const availabilitySchema = z.object({
  location: z.enum(['zadar','biograd']), service: z.coerce.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), duration: z.coerce.number().refine(v => v === 30 || v === 60),
})
