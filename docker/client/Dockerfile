FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_AWS_S3
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_GA_ID

# Create .env.production from build args
RUN echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" > .env.production && \
    echo "NEXT_PUBLIC_AWS_S3=${NEXT_PUBLIC_AWS_S3}" >> .env.production && \
    echo "NEXT_PUBLIC_GTM_ID=${NEXT_PUBLIC_GTM_ID}" >> .env.production && \
    echo "NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}" >> .env.production

ENV NEXT_PRIVATE_STANDALONE=true

RUN corepack enable pnpm && pnpm run build;

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PRIVATE_STANDALONE=true

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]