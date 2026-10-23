# Backend API image: Node 24 (same as the Lambda runtime), production dependencies only,
# runs as the unprivileged "node" user. Settings come from environment variables at runtime.
FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production \
    PORT=4000 \
    UPLOAD_DIR=/data/uploads \
    MESSAGES_DIR=/data/messages

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src ./src
COPY scripts ./scripts

# Uploaded images and contact messages live here; mount a volume to keep them.
RUN mkdir -p /data && chown node:node /data
VOLUME /data

USER node
EXPOSE 4000
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:4000/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "src/index.js"]
