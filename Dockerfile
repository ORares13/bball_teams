FROM node:20-alpine AS deps
WORKDIR /app

# Copy env so prisma generate can read DATABASE_URL
COPY .env .env

# Install dependencies
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app

# Copy source code and env
COPY . .
COPY .env .env

# Use installed deps from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Prisma generate (requires .env)
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/.env .env  # optional to remove

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]

