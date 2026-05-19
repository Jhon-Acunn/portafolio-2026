#!/bin/bash
# ============================================================
# 🚀 DEPLOY: Local → Homelab (sin internet)
# Uso: bash deploy.sh
# ============================================================

set -e

HOST="acn@192.168.119.171"
IMAGE_NAME="portfolio-2026:latest"
CONTAINER_NAME="portfolio-2026"
EXTERNAL_PORT=3000
PROJECT_DIR="/Users/jhonacunn/Desktop/test/portfolio-2026"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║     🚀 DEPLOY PORTAFOLIO AL HOMELAB         ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

cd "$PROJECT_DIR"

# ── Paso 1: Build ──────────────────────────────────
echo "📦 [1/7] Build local..."
npm run build 2>&1 | tail -2
echo "      ✅ Build completado"

# ── Paso 2: Preparar carpeta temporal con todo ────
echo "📁 [2/7] Preparando carpeta para deploy..."
DEPLOY_DIR="/tmp/portfolio-deploy"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# Copiar archivos de configuración
cp Dockerfile docker-compose.yml package.json package-lock.json "$DEPLOY_DIR/" 2>/dev/null || true

# Copiar standalone output (server.js, node_modules, etc.)
cp -r .next/standalone/portfolio-2026/* "$DEPLOY_DIR/"

# Copiar .next completo del proyecto raíz (sobrescribe el del standalone)
# Excluimos standalone/ (ya copiado), cache/ (grande e innecesario)
rsync -a --delete \
  --exclude=standalone \
  --exclude=cache \
  --exclude=dev \
  --exclude=turbopack \
  --exclude=trace* \
  .next/ "$DEPLOY_DIR/.next/"

# Copiar public/
cp -r public "$DEPLOY_DIR/" 2>/dev/null || true

echo "      ✅ Deploy folder ready en $DEPLOY_DIR"
ls -la "$DEPLOY_DIR/" | head -10

# ── Paso 3: Comprimir ──────────────────────────────
echo "📦 [3/7] Comprimiendo para transferencia..."
tar czf /tmp/portfolio-deploy.tar.gz -C "$DEPLOY_DIR" .

# ── Paso 4: Subir al homelab ───────────────────────
echo "📤 [4/7] Subiendo a $HOST..."
scp /tmp/portfolio-deploy.tar.gz "$HOST:/tmp/"

# ── Paso 5: Preparar y construir ───────────────────
echo "🔧 [5/7] Preparando y construyendo imagen..."
ssh "$HOST" bash -s << 'REMOTE'
set -e
rm -rf /home/acn/portfolio-deploy
mkdir -p /home/acn/portfolio-deploy
tar xzf /tmp/portfolio-deploy.tar.gz -C /home/acn/portfolio-deploy
rm -f /tmp/portfolio-deploy.tar.gz
cd /home/acn/portfolio-deploy

echo "   → Estructura recibida:"
ls -la

echo ""
echo "   → Construyendo imagen Docker..."
docker build -t portfolio-2026:latest .
REMOTE

# ── Paso 6: Desplegar ───────────────────────────────
echo "🚀 [6/7] Desplegando contenedor..."
ssh "$HOST" bash -s << 'REMOTE'
  CONTAINER_NAME="portfolio-2026"
EXTERNAL_PORT=3002
  IMAGE_NAME="portfolio-2026:latest"

  echo "   → Deteniendo contenedor anterior..."
  docker stop "$CONTAINER_NAME" 2>/dev/null || true
  docker rm "$CONTAINER_NAME" 2>/dev/null || true

  echo "   → Iniciando nuevo contenedor..."
  docker run -d \
    --name "$CONTAINER_NAME" \
    --restart unless-stopped \
    -p "$EXTERNAL_PORT:3000" \
    "$IMAGE_NAME"

  echo "   → Esperando 5s..."
  sleep 5
REMOTE

# ── Paso 7: Verificar ───────────────────────────────
echo "📋 [7/7] Verificando deploy..."
ssh "$HOST" bash -s << 'REMOTE'
  echo "   → Estado del contenedor:"
  docker ps --filter name=portfolio-2026 --format '     {{.Names}}  →  {{.Status}}  →  {{.Ports}}'

  echo ""
  echo "   → Logs del contenedor:"
  docker logs portfolio-2026 2>&1 | tail -8

  echo ""
  echo "   → Health check HTTP:"
  HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000 2>/dev/null || echo "—")
  echo "     Status: $HTTP_CODE"
REMOTE

# ── Limpiar ─────────────────────────────────────────
rm -rf "$DEPLOY_DIR" /tmp/portfolio-deploy.tar.gz

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║     ✅ DEPLOY COMPLETADO                     ║"
echo "║     🌐 http://192.168.119.171:3002           ║"
echo "║                                              ║"
echo "║     Próxima actualización:                   ║"
echo "║     bash deploy.sh                           ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
