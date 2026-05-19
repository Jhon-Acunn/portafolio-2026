# ============================================================
# OFFLINE BUILD: Usa node_modules y .next pre-construidos
# Homelab sin internet — copia local al contenedor
# ============================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar archivos del standalone output
# (extraídos al root del build context, no bajo .next/standalone/)
COPY node_modules ./node_modules
COPY package.json ./
COPY server.js ./
COPY .next ./.next

# Copiar archivos públicos
COPY public ./public

# Permisos correctos
RUN chown -R nextjs:nodejs /app

# Cambiar a usuario no-root
USER nextjs

# Puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Health check (usa node en vez de wget que no viene en Alpine)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "const http = require('http'); http.get('http://localhost:3000', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Iniciar
CMD ["node", "server.js"]
