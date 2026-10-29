import type { EmailAdapter } from 'payload'
import nodemailer from 'nodemailer'

/** A small Payload adapter using the maintained Nodemailer release. */
export const clinicEmail: EmailAdapter = () => {
  const fromAddress = process.env.SMTP_FROM || 'disabled@example.invalid'
  const transport = process.env.SMTP_HOST ? nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    disableFileAccess: true,
    disableUrlAccess: true,
    ...(process.env.SMTP_USER ? { auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } } : {}),
  }) : null
  return {
    name: transport ? 'smtp' : 'disabled',
    defaultFromAddress: fromAddress,
    defaultFromName: 'Prehab',
    sendEmail: async message => {
      if (!transport) throw new Error('SMTP is not configured. Contact an administrator.')
      return transport.sendMail({ from: { name: 'Prehab', address: fromAddress }, ...message })
    },
  }
}
