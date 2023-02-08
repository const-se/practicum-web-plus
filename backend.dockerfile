FROM node:18-alpine AS builder
WORKDIR /app
COPY ./backend/package*.json .
RUN npm ci --no-audit
COPY ./backend .
RUN npm run prebuild && npm run build

FROM node:18-alpine AS backend
WORKDIR /app
COPY ./backend/package*.json .
RUN npm ci --omit=dev --no-audit && npm i -g pm2
COPY --from=builder /app/dist ./dist
COPY ./backend/ecosystem.config.js .
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
