# Dependency review — 29 October 2026

The delivered lockfile uses Payload 3.92.1 and Next.js 16.4.3. Vulnerable inherited versions of image processing, email, validation, sanitization and other transitive packages were updated. Explicit npm overrides pin compatible fixes where the Payload dependency graph has not yet adopted them.

The production dependency audit (`npm audit --omit=dev`) reports **0 critical, 0 high and 0 moderate advisories**. It still reports **8 low-severity entries**, all tracing to the same unpatched `deepmerge` 4.3.1 prototype-poisoning advisory and packages depending on it:

https://github.com/advisories/GHSA-gcqx-w48m-w2h4

The latest published `deepmerge` version checked was 4.3.1. The project does not downgrade it to make the audit disappear. Public booking/contact inputs use strict schemas and explicit field mappings; CMS write operations are access controlled. These measures do not constitute a proof that every upstream call site is unaffected. Recheck the advisory and update the lockfile when a supported fix is available, and reassess before public launch.

GraphQL is disabled. Its bundled scalar dependency is nevertheless updated. The email integration uses the current Nodemailer release through a small Payload adapter, with file/URL access disabled and bounded SMTP timeouts.

Repeat the audit and project checks after dependency updates. An audit result is a point-in-time signal, not a complete security assessment.
