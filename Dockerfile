# Blasto frontend as a Docker image.
#
# Stage 1 builds the static site (`npm run build` → /app/out).
# Stage 2 is a tiny Caddy web server that serves those files on port 80.
# HTTPS and the domain are handled by the main Caddy on the server, which
# forwards blasto.lv to this container (see deploy/README.md).
#
#   docker build -t blasto-frontend .
#   docker run --rm -p 8080:80 blasto-frontend      → http://localhost:8080

# ---------- 1. Build ----------
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first: this layer is reused when only code changes.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
# The public address used in canonical links, hreflang tags and the sitemap.
ARG NEXT_PUBLIC_SITE_URL=https://blasto.lv
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- 2. Serve ----------
FROM caddy:2-alpine
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY deploy/redirects.caddy /etc/caddy/redirects.caddy
COPY --from=build /app/out /srv
EXPOSE 80
