# Validation

Verified during project preparation:

- TypeScript type check.
- ESLint.
- Production Next.js build.
- HTTP checks of nine public/admin routes, admin authentication, the protected reservation form, and the enabled booking form backed by live CMS records.
- Seven scheduling/input unit tests.
- Eleven backend integration tests against a disposable PGlite PostgreSQL-compatible database using the actual Payload migration, schema and API route handlers.

Integration coverage: anonymous private-data access, editor permissions and role escalation, first-admin protection, draft/publish visibility, origin and input checks, saved bookings and idempotent retries, same-location overlap rejection, independent location availability, direct SQL exclusion constraint, cancellation, blocked periods, automatic staff end times, concurrent SQL conflicts, staff time validation and rate limits.

The preparation sandbox required local process-memory/network-display shims and Next's WASM compiler for its restricted operating-system environment. Those sandbox shims are not part of the application or production Docker image. The source builds with normal Node/Next tooling on a supported host.

The disposable test database is not a substitute for production PostgreSQL concurrency/load testing. Docker hosting, real SMTP, HTTPS/reverse-proxy setup, backups and the final clinic legal information require validation in the chosen deployment environment.

Browser screenshot and interactive browser testing could not run in the restricted preparation environment (the Chromium process exited during startup). Visual and mobile interaction checks should therefore be completed on the target host.

All 140 original public assets were checked against the uploaded archive and preserved byte-for-byte. See `DEPENDENCIES.md` for the point-in-time dependency audit and the remaining upstream low-severity advisory.
