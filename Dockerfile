FROM node:20-bullseye-slim AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY ./tsconfig.json ./
COPY ./ .
WORKDIR /app
RUN npm run build

FROM node:20-bullseye-slim AS runner
WORKDIR /app
COPY ./package*.json ./
RUN npm ci --production
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]