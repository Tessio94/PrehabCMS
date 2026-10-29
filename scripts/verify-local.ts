/** Local disposable verification harness; production uses a real PostgreSQL server. */
import { spawn, type ChildProcess } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { PGlite } from '@electric-sql/pglite'
import { btree_gist } from '@electric-sql/pglite/contrib/btree_gist'
import { PGLiteSocketServer } from '@electric-sql/pglite-socket'
const db = await PGlite.create({ extensions: { btree_gist } })
const server = new PGLiteSocketServer({ db, port: 5437, host:'127.0.0.1', maxConnections:20 })
await server.start()
const env = { ...process.env, DATABASE_URL:'postgresql://postgres:postgres@127.0.0.1:5437/postgres', TEST_DATABASE_URL:'postgresql://postgres:postgres@127.0.0.1:5437/postgres', DATABASE_POOL_SIZE:'8', PAYLOAD_SECRET:randomBytes(32).toString('hex'), ADMIN_EMAIL:'admin@prehab.test',ADMIN_PASSWORD:randomBytes(24).toString('hex'),SERVER_URL:process.argv.includes('--http') ? 'http://localhost:3100' : 'http://localhost:3000', SMTP_HOST:'' }
async function run(args: string[]) {
  const code = await new Promise<number | null>((resolve,reject) => { const child=spawn(process.execPath,args,{env,stdio:'inherit'});child.on('error',reject);child.on('exit',resolve) })
  if(code!==0) throw new Error(`Command failed (${code}): ${args.join(' ')}`)
}
let app: ChildProcess | undefined
try {
  await run(['node_modules/payload/bin.js','migrate'])
  await run(['--import','tsx','scripts/seed.ts'])
  if (!process.argv.includes('--http')) await run(['--import','tsx','--test','--test-force-exit','tests/integration/backend.test.ts'])
  if (process.argv.includes('--http')) {
    app = spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','3100','-H','127.0.0.1'],{env,stdio:'inherit'})
    let ready = false
    for (let i = 0; i < 100; i++) {
      if (app.exitCode !== null) throw new Error('Production server exited before becoming ready.')
      try { const res = await fetch(`${env.SERVER_URL}/api/services?limit=1`); if (res.ok) { ready = true; break } } catch {}
      await new Promise(resolve => setTimeout(resolve,300))
    }
    if (!ready) throw new Error('Production server did not start within 30 seconds.')
    await run(['--import','tsx','tests/integration/http-smoke.ts'])
  }
} finally {
  if (app && app.exitCode === null) {
    const stopped = new Promise(resolve => app!.once('exit',resolve))
    app.kill('SIGTERM')
    await stopped
  }
  await server.stop()
  // Drain socket close/detach callbacks before destroying the underlying WASM database.
  await new Promise<void>(resolve => setImmediate(() => setImmediate(resolve)))
  await db.close()
}
