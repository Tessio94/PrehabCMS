import test from 'node:test'
import assert from 'node:assert/strict'
import { localStart, slotsForDay, validateInterval, overlaps, parseDay } from '../lib/booking/time'
import { bookingSchema } from '../lib/booking/validation'
const base = { date: '2027-02-01', duration: 30, days: ['1','2','3','4','5'], busy: [], leadMinutes: 0, horizonDays: 90, now: new Date('2027-01-31T12:00:00Z') }
test('30-minute bookings run 08:00–18:30; 60-minute bookings end by 19:00', () => {
  const half = slotsForDay(base), hour = slotsForDay({ ...base, duration: 60 })
  assert.equal(half.length, 22); assert.equal(half[0].time, '08:00'); assert.equal(half.at(-1)?.time, '18:30')
  assert.equal(hour.length, 21); assert.equal(hour.at(-1)?.time, '18:00')
  assert.throws(() => validateInterval(localStart(base.date, '18:30').toISO()!, 60))
  assert.throws(() => validateInterval(localStart(base.date, '07:30').toISO()!, 30))
})
test('Croatian daylight-saving time is independent of server timezone', () => {
  assert.equal(localStart('2027-01-04','08:00').toUTC().hour, 7)
  assert.equal(localStart('2027-07-05','08:00').toUTC().hour, 6)
  assert.equal(localStart('2027-03-28','08:00').toUTC().hour, 6)
  assert.equal(localStart('2027-10-31','08:00').toUTC().hour, 7)
})
test('overlaps exclude partial overlaps but allow adjacent bookings', () => {
  const booking = validateInterval(localStart(base.date,'09:00').toISO()!, 60)
  const half = slotsForDay({ ...base, busy: [booking] }).map(s => s.time)
  assert.ok(half.includes('08:30')); assert.ok(!half.includes('09:00')); assert.ok(!half.includes('09:30')); assert.ok(half.includes('10:00'))
  const hour = slotsForDay({ ...base, duration: 60, busy: [booking] }).map(s => s.time)
  assert.ok(!hour.includes('08:30')); assert.ok(hour.includes('08:00'))
  assert.equal(overlaps('2027-02-01T08:00Z','2027-02-01T09:00Z','2027-02-01T09:00Z','2027-02-01T10:00Z'), false)
})
test('closed days, past days, horizon and minimum lead time are enforced', () => {
  assert.deepEqual(slotsForDay({ ...base, days: ['2'] }), [])
  assert.deepEqual(slotsForDay({ ...base, date: '2027-01-30' }), [])
  assert.deepEqual(slotsForDay({ ...base, date: '2028-02-01' }), [])
  assert.equal(slotsForDay({ ...base, now: new Date('2027-02-01T07:15Z'), leadMinutes: 60 })[0].time, '09:30')
})
test('invalid dates and non-supported durations are rejected', () => {
  assert.throws(() => parseDay('2027-02-30')); assert.throws(() => localStart(base.date, '08:15'))
  assert.throws(() => validateInterval(localStart(base.date, '08:00').toISO()!,45))
})
test('public booking schema rejects tampering, unacknowledged notices and health-note fields', () => {
  const data = { location:'zadar', service:1, date:'2027-02-01',time:'08:00',duration:30, fullName:'Test User',phone:'+385951234567',email:'',privacyAcknowledged:true,privacyVersion:'test-v1',requestKey:'2ad4ecfa-40bd-4f74-b6ac-01210c6ed132',website:'' }
  assert.ok(bookingSchema.safeParse(data).success)
  assert.ok(!bookingSchema.safeParse({ ...data, duration:45 }).success)
  assert.ok(!bookingSchema.safeParse({ ...data, privacyAcknowledged:false }).success)
  assert.ok(!bookingSchema.safeParse({ ...data, status:'confirmed' }).success)
  assert.ok(!bookingSchema.safeParse({ ...data, diagnosis:'private' }).success)
  assert.ok(!bookingSchema.safeParse({ ...data, website:'bot' }).success)
})

test('availability keeps 08:00–19:00 local hours on both DST change Sundays', () => {
  for (const date of ['2027-03-28','2027-10-31']) {
    const slots = slotsForDay({ ...base, date, days:['0'], now:new Date(date === '2027-03-28' ? '2027-03-27T10:00:00Z' : '2027-10-30T10:00:00Z') })
    assert.equal(slots.length,22)
    assert.equal(slots[0].time,'08:00')
    assert.equal(slots.at(-1)?.time,'18:30')
    assert.equal(slots[0].startTime.slice(11,16),date === '2027-03-28' ? '06:00' : '07:00')
  }
})
