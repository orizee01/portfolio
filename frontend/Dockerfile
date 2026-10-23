# Frontend image: build the Vite site with Node, serve it with unprivileged nginx on port 8080.
# nginx also forwards /api and /uploads to the backend container (see nginx.conf).

FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Empty by default: the site calls /api on its own origin and nginx proxies it.
# Set it to call a different backend, e.g. --build-arg VITE_API_URL=https://api.example.com
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
