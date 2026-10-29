import test from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'
import type { ClinicSetting } from '../../payload-types'
import nextEnv from '@next/env'
nextEnv.loadEnvConfig(process.cwd())
if (!process.env.TEST_DATABASE_URL) throw new Error('Set TEST_DATABASE_URL to a DISPOSABLE migrated and seeded database. Never run against production.')
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
const { cms } = await import('../../lib/cms')
const { POST } = await import('../../app/(root)/api/booking/route')
const { GET } = await import('../../app/(root)/api/availability/route')
const payload = await cms()
const origin = process.env.SERVER_URL || 'http://localhost:3000'
const date = DateTime.now().setZone('Europe/Zagreb').plus({ days: 7 }).toISODate()!
const services = await payload.find({ collection: 'services', limit: 1 })
const serviceID = services.docs[0].id
const users = await payload.find({ collection: 'users', limit: 1 })
const admin = users.docs[0]
const input = (extra = {}) => ({ location: 'zadar', service: serviceID, date, time:'08:00', duration:60, fullName:'Integration Test', phone:'+385950000001', email:'', privacyAcknowledged:true, privacyVersion:'test-v1', website:'', requestKey: randomUUID(), ...extra })
const book = (body: object, headers: Record<string,string> = {}) => POST(new Request(`${origin}/api/booking`, { method:'POST', headers:{ Origin: origin, 'Content-Type':'application/json', ...headers }, body: JSON.stringify(body) }))
let originalSettings: ClinicSetting

test.before(async () => {
  originalSettings = await payload.findGlobal({ slug:'clinic-settings' })
  await payload.updateGlobal({ slug:'clinic-settings', data: {
    bookingEnabled:true, privacyReviewed:true, legalName:'TEST CLINIC – NOT REAL', registeredAddress:'TEST ONLY', oib:'00000000000', registry:'TEST', professionalDetails:'TEST', privacyEmail:'privacy@example.test', processors:'TEST DATABASE', transfers:'TEST', healthLegalBasis:'TEST ONLY', privacyVersion:'test-v1', leadMinutes:0,
  } })
  const locations = await payload.find({ collection:'locations', pagination:false })
  for (const l of locations.docs) await payload.update({ collection:'locations',id:l.id,data:{openingDays:['0','1','2','3','4','5','6']} })
})

test('public access cannot list reservations, inquiries or user accounts', async () => {
  for (const collection of ['reservations','inquiries','users'] as const) {
    await assert.rejects(() => payload.find({ collection, overrideAccess:false }), /not allowed|dopu|permiss|forbidden/i)
  }
})
test('editor cannot read bookings or elevate their own role', async () => {
  const editor = await payload.create({ collection:'users', user:admin, overrideAccess:false, data:{ name:'Test Editor',email:'editor@example.test',password:randomUUID(),role:'editor' } })
  await assert.rejects(() => payload.find({ collection:'reservations',user:editor,overrideAccess:false }))
  await payload.update({collection:'users',id:editor.id,user:editor,overrideAccess:false,data:{role:'admin'}})
  assert.equal((await payload.findByID({collection:'users',id:editor.id})).role,'editor')
})
test('anonymous bootstrap user creation is blocked', async () => {
  await assert.rejects(() => payload.create({collection:'users',data:{name:'No',email:'blocked@example.test',password:randomUUID(),role:'admin'}}))
})
test('draft articles are hidden and publication becomes visible', async () => {
  const post = await payload.create({ collection:'posts',draft:true,data:{title:'Draft Test',slug:'integration-draft',category:'Test',excerpt:'Test draft',sections:[{title:'Test',body:{root:{type:'root',format:'',indent:0,version:1,direction:null,children:[{type:'paragraph',format:'',indent:0,version:1,children:[{type:'text',text:'Test',version:1}]}]}}}],_status:'draft'} })
  const hidden = await payload.find({collection:'posts',overrideAccess:false,where:{id:{equals:post.id}}})
  assert.equal(hidden.docs.length,0)
  await assert.rejects(() => payload.findVersions({ collection:'posts', overrideAccess:false }))
  await payload.update({collection:'posts',id:post.id,data:{_status:'published'}})
  assert.equal((await payload.find({collection:'posts',overrideAccess:false,where:{id:{equals:post.id}}})).docs.length,1)
})
test('booking API checks origin and strict input', async () => {
  assert.equal((await book(input(), { Origin:'https://untrusted.example' })).status,403)
  assert.equal((await book(input({duration:45}))).status,400)
  assert.equal((await book(input({privacyAcknowledged:false}))).status,400)
})
test('booking succeeds; retry is idempotent; overlapping and cross-location slots behave correctly', async () => {
  const body = input()
  const first = await book(body)
  const result = await first.json()
  assert.equal(first.status,201,JSON.stringify(result)); assert.ok(result.reference)
  const retry = await book(body)
  assert.equal(retry.status,200); assert.equal((await retry.json()).reference,result.reference)
  assert.equal((await book(input({time:'08:30',duration:30}))).status,409)
  assert.equal((await book(input({location:'biograd',phone:'+385950000002'}))).status,201)
  const availability = await GET(new Request(`${origin}/api/availability?location=zadar&service=${serviceID}&date=${date}&duration=30`))
  assert.equal(availability.status,200)
  const free = await availability.json()
  assert.ok(!free.slots.includes('08:00')); assert.ok(!free.slots.includes('08:30')); assert.ok(free.slots.includes('09:00'))
  assert.ok(!JSON.stringify(free).includes('Integration Test'))
})
test('database rejects overlap even when application hooks are bypassed; cancellation releases slot', async () => {
  // Raw SQL is intentional: this verifies the last line of defence independently of Payload hooks.
  await assert.rejects(() => payload.db.pool.query(`INSERT INTO reservations (kind, location, start_time, end_time, status) VALUES ('blocked','zadar',$1,$2,'confirmed')`, [DateTime.fromISO(`${date}T08:30`,{zone:'Europe/Zagreb'}).toUTC().toISO(),DateTime.fromISO(`${date}T10:00`,{zone:'Europe/Zagreb'}).toUTC().toISO()]), (e: unknown) => (e as {code:string}).code === '23P01')
  const reservation = (await payload.find({collection:'reservations',where:{and:[{location:{equals:'zadar'}},{fullName:{equals:'Integration Test'}}]},limit:1})).docs[0]
  await payload.update({collection:'reservations',id:reservation.id,data:{status:'cancelled'}})
  const free = await GET(new Request(`${origin}/api/availability?location=zadar&service=${serviceID}&date=${date}&duration=60`))
  assert.ok((await free.json()).slots.includes('08:00'))
})
test('staff-created blocked periods cannot be booked and invalid admin times fail', async () => {
  const start = DateTime.fromISO(`${date}T10:00`,{zone:'Europe/Zagreb'}).toUTC().toISO()!
  const end = DateTime.fromISO(`${date}T12:00`,{zone:'Europe/Zagreb'}).toUTC().toISO()!
  await payload.create({collection:'reservations',data:{kind:'blocked',location:'zadar',startTime:start,endTime:end,startTime_tz:'Europe/Zagreb',endTime_tz:'Europe/Zagreb',status:'confirmed'}})
  const free = await GET(new Request(`${origin}/api/availability?location=zadar&service=${serviceID}&date=${date}&duration=60`))
  const slots = (await free.json()).slots
  assert.ok(!slots.includes('09:30')); assert.ok(!slots.includes('11:30')); assert.ok(slots.includes('12:00'))
  await assert.rejects(() => payload.create({collection:'reservations',data:{kind:'appointment',location:'zadar',service:serviceID,duration:'60',fullName:'Test',phone:'1234567',startTime:DateTime.fromISO(`${date}T18:30`,{zone:'Europe/Zagreb'}).toUTC().toISO()!,endTime:end,startTime_tz:'Europe/Zagreb',endTime_tz:'Europe/Zagreb',status:'confirmed'}}))
})
test('staff can create an appointment without entering an end time', async () => {
  const start = DateTime.fromISO(`${date}T13:00`,{zone:'Europe/Zagreb'}).toUTC().toISO()!
  const doc = await payload.create({collection:'reservations', user:admin, overrideAccess:false, data:{kind:'appointment',location:'zadar',service:serviceID,duration:'60',fullName:'Staff Test',phone:'1234567',startTime:start,startTime_tz:'Europe/Zagreb',endTime_tz:'Europe/Zagreb',status:'confirmed'}})
  assert.equal(Date.parse(doc.endTime!) - Date.parse(doc.startTime), 60 * 60000)
})
test('concurrent SQL attempts cannot occupy the same interval', async () => {
  const start = DateTime.fromISO(`${date}T15:00`,{zone:'Europe/Zagreb'}).toUTC().toISO()!
  const end = DateTime.fromISO(`${date}T16:00`,{zone:'Europe/Zagreb'}).toUTC().toISO()!
  const query = () => payload.db.pool.query(`INSERT INTO reservations (kind, location, start_time, end_time, status) VALUES ('blocked','zadar',$1,$2,'confirmed')`,[start,end])
  const outcomes = await Promise.allSettled([query(),query()])
  assert.equal(outcomes.filter(r => r.status === 'fulfilled').length, 1)
  const failed = outcomes.find(r => r.status === 'rejected') as PromiseRejectedResult
  assert.equal(failed.reason.code, '23P01')
})
test('rate limiter persists across requests', async () => {
  let limited = false
  for (let i=0;i<12;i++) if ((await book(input({phone:`+3859500000${i}`,time:'14:00'}))).status === 429) { limited = true; break }
  assert.ok(limited)
})

test.after(async () => {
  await payload.updateGlobal({ slug:'clinic-settings',data:{ ...originalSettings, bookingEnabled:false } })
  await payload.destroy()
  // Public endpoint rate-limit pool intentionally stays open in a web process.
  const { closeRatePool } = await import('../../lib/booking/http')
  await closeRatePool()
})
