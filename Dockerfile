FROM node:24.22.1-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Build-only placeholders. Runtime secrets are injected by the deployment environment.
RUN BUILD_STANDALONE=1 PAYLOAD_SECRET=build-only-placeholder-secret-at-least-32-characters DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build SERVER_URL=http://localhost:3000 npm run build

FROM node:24.22.1-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000 MEDIA_DIR=/app/media
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
RUN mkdir -p /app/media && chown node:node /app/media
USER node
EXPOSE 3000
CMD ["node", "server.js"]
