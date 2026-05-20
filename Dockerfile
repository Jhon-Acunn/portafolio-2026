# ============================================================
# DOCKER BUILD PARA PORTAINER
# Build completo desde el repositorio
# ============================================================

FROM node:20-alpine AS runner

WORKDIR /app

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar dependencias
COPY package.json package-lock.json ./

# Instalar TODAS las dependencias (incluye dev)
RUN npm install --no-audit --no-fund

# Copiar el resto del código fuente
COPY . .

# Build de Next.js
RUN npm run build

# Eliminar devDependencies para reducir tamaño
RUN npm prune --production --no-audit --no-fund

# Permisos
RUN chown -R nextjs:nodejs /app

# Cambiar a usuario no-root
USER nextjs

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
    CMD node -e "const http = require('http'); http.get('http://localhost:3000', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Iniciar servidor Next.js
CMD ["node_modules/.bin/next", "start"]
