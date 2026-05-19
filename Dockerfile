# ============================================================
# DOCKER BUILD PARA PORTAINER (build desde GitHub)
# Portainer clona el repo y construye esta imagen
# ============================================================

# ---- STAGE 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias (incluye devDependencies para el build)
RUN npm ci

# Copiar el resto del código
COPY . .

# Build de Next.js (genera .next/standalone)
RUN npm run build

# ---- STAGE 2: Production ----
FROM node:20-alpine AS runner

WORKDIR /app

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar el contenido de standalone/portfolio-2026/ directamente a la raíz
# Next.js genera: .next/standalone/<project-name>/
COPY --from=builder /app/.next/standalone/portfolio-2026/ ./

# Copiar assets estáticos (necesarios aparte en Next.js standalone)
COPY --from=builder /app/.next/static ./.next/static

# Copiar archivos públicos
COPY --from=builder /app/public ./public

# Permisos
RUN chown -R nextjs:nodejs /app

# Usuario no-root
USER nextjs

# Puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "const http = require('http'); http.get('http://localhost:3000', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Iniciar servidor (server.js está en la raíz)
CMD ["node", "server.js"]
