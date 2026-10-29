import { DateTime } from 'luxon'

export const ZONE = 'Europe/Zagreb'
export const OPEN_MINUTE = 8 * 60
export const CLOSE_MINUTE = 19 * 60
export const LOCATIONS = ['zadar', 'biograd'] as const
export type LocationCode = (typeof LOCATIONS)[number]
export const locationNames = { zadar: 'Zadar', biograd: 'Biograd' }
export const isLocation = (v: unknown): v is LocationCode => LOCATIONS.includes(v as LocationCode)
export const localDate = (now = new Date()) => DateTime.fromJSDate(now).setZone(ZONE).toISODate()!

export function parseDay(day: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) throw new Error('Neispravan datum.')
  const date = DateTime.fromISO(day, { zone: ZONE })
  if (!date.isValid || date.toISODate() !== day) throw new Error('Neispravan datum.')
  return date
}

export function localStart(day: string, time: string) {
  parseDay(day)
  if (!/^(\d{2}):(00|30)$/.test(time)) throw new Error('Termin mora početi na puni sat ili pola sata.')
  const dt = DateTime.fromISO(`${day}T${time}:00`, { zone: ZONE })
  if (!dt.isValid || dt.toFormat('HH:mm') !== time) throw new Error('Neispravno vrijeme.')
  return dt
}

export function validateInterval(start: string, duration: number) {
  const dt = DateTime.fromISO(start, { setZone: true }).setZone(ZONE)
  if (!dt.isValid || ![30, 60].includes(duration) || dt.second !== 0 || dt.millisecond !== 0 || dt.minute % 30 !== 0)
    throw new Error('Termin mora trajati 30 ili 60 minuta i početi na puni sat ili pola sata.')
  const minutes = dt.hour * 60 + dt.minute
  if (minutes < OPEN_MINUTE || minutes + duration > CLOSE_MINUTE) throw new Error('Termini su od 08:00 do 19:00.')
  return { startTime: dt.toUTC().toISO()!, endTime: dt.plus({ minutes: duration }).toUTC().toISO()!, local: dt }
}

export function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return Date.parse(aStart) < Date.parse(bEnd) && Date.parse(aEnd) > Date.parse(bStart)
}

export function slotsForDay({ date, duration, days, busy, leadMinutes, horizonDays, now = new Date() }: {
  date: string; duration: number; days: string[]; busy: { startTime: string; endTime: string }[];
  leadMinutes: number; horizonDays: number; now?: Date
}) {
  const day = parseDay(date)
  const current = DateTime.fromJSDate(now).setZone(ZONE)
  if (![30, 60].includes(duration) || !days.includes(String(day.weekday % 7)) || day < current.startOf('day') || day > current.startOf('day').plus({ days: horizonDays })) return []
  const result: { time: string; startTime: string; endTime: string }[] = []
  for (let min = OPEN_MINUTE; min + duration <= CLOSE_MINUTE; min += 30) {
    // Use local clock fields: elapsed minutes since midnight shift on DST Sundays.
    const start = day.set({ hour: Math.floor(min / 60), minute: min % 60, second: 0, millisecond: 0 })
    if (start < current.plus({ minutes: leadMinutes })) continue
    const interval = validateInterval(start.toISO()!, duration)
    if (!busy.some(b => overlaps(interval.startTime, interval.endTime, b.startTime, b.endTime))) {
      result.push({ time: start.toFormat('HH:mm'), startTime: interval.startTime, endTime: interval.endTime })
    }
  }
  return result
}
