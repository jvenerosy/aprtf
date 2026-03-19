# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Variables d'environnement nécessaires au build (PUBLIC_* sont intégrées)
ARG PUBLIC_HOST_API
ENV PUBLIC_HOST_API=${PUBLIC_HOST_API}

RUN npm run build
RUN npm prune --production

FROM node:20-alpine AS runner

WORKDIR /app

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 sveltekit

# Copier les fichiers avec les bons droits
COPY --from=builder --chown=sveltekit:nodejs /app/build build/
COPY --from=builder --chown=sveltekit:nodejs /app/node_modules node_modules/
COPY --chown=sveltekit:nodejs package.json .

# Supprimer les utilitaires dangereux
RUN rm -f /usr/bin/wget /usr/bin/curl 2>/dev/null || true && \
    rm -rf /var/cache/apk/*

# Variables runtime
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
ENV ORIGIN=https://aprtf.jvnr.fr

# Utiliser l'utilisateur non-root
USER sveltekit

EXPOSE 3000

# Healthcheck avec node au lieu de wget
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "build"]
