/** Run by the disposable verification harness with a built production server. */
import assert from 'node:assert/strict'
const base = process.env.SERVER_URL || 'http://localhost:3000'
const paths = ['/', '/zdravlje', '/zdravlje/pemf-terapija', '/zdravlje/skolioza-kamp', '/rezervacije', '/politika-privatnosti', '/impressum', '/kontakt', '/admin/login']
for (const path of paths) {
  const response = await fetch(`${base}${path}`)
  assert.equal(response.status,200,`${path} HTTP ${response.status}`)
  const html = await response.text()
  assert.ok(html.includes('<html'),`${path} should return HTML`)
  assert.ok(!html.includes('Application error:'), `${path} application error`)
  console.log(`HTTP OK ${path}`)
}
const api = await fetch(`${base}/api/reservations`)
assert.ok([401,403].includes(api.status),`Public reservations API: ${api.status}`)
const login = await fetch(`${base}/api/users/login`,{ method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify({email:process.env.ADMIN_EMAIL,password:process.env.ADMIN_PASSWORD}) })
assert.equal(login.status,200,'Admin login')
const data = await login.json()
assert.ok(data.token,'Admin token')
const cookie = login.headers.getSetCookie().map(value => value.split(';')[0]).join('; ')
const me = await fetch(`${base}/api/users/me`, { headers: { Cookie: cookie, Origin:base } })
assert.equal((await me.json()).user?.role,'admin','Authenticated admin session')
const admin = await fetch(`${base}/admin/collections/reservations/create`,{headers:{Cookie:cookie,Origin:base}})
assert.equal(admin.status,200,'Admin create reservation page')
const html = await admin.text()
assert.ok(html.includes('startTime'),'Admin reservation date field')
assert.ok(html.includes('duration'),'Admin duration field')
console.log('HTTP OK authenticated admin reservation form')

const settings = await fetch(`${base}/api/globals/clinic-settings`, { method:'POST', headers:{ 'Content-Type':'application/json',Origin:base,Authorization:`JWT ${data.token}` }, body:JSON.stringify({bookingEnabled:true,privacyReviewed:true,legalName:'TEST CLINIC',registeredAddress:'TEST',oib:'00000000000',registry:'TEST',professionalDetails:'TEST',privacyEmail:'privacy@example.test',processors:'TEST',transfers:'TEST',healthLegalBasis:'TEST',privacyVersion:'test-v1'}) })
assert.equal(settings.status,200,'Enable booking with legal fields in disposable test database')
const booking = await fetch(`${base}/rezervacije`)
assert.equal(booking.status,200)
const bookingHTML = await booking.text()
assert.ok(bookingHTML.includes('fullName'),'Booking contact field')
assert.ok(bookingHTML.includes('Potvrdi rezervaciju'),'Booking submit button')
assert.ok(bookingHTML.includes('Zadar') && bookingHTML.includes('Biograd'),'Both locations')
console.log('HTTP OK enabled booking form with live CMS services')
