FROM node:18-alpine AS builder
WORKDIR /app
COPY ./frontend/package*.json .
RUN npm ci --no-audit
COPY ./frontend .
COPY ./.env .
RUN npm run build

FROM nginx:1.23.3-alpine AS frontend
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./config/nginx/default.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
