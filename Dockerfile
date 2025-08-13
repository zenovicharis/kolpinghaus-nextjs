# Install dependencies and build the app
FROM node:24-slim AS builder

WORKDIR /app

# Copy only the dependency files first for better caching
COPY package*.json ./

# Install all dependencies (including devDeps for build)
RUN npm install

# Copy the rest of the code
COPY . .


# Build Next.js app
RUN npm run build

# Prepare production image
FROM node:24-slim AS runner

WORKDIR /app

# Copy production files only
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Optionally copy config files
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/.babelrc ./.babelrc
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

# Start the server
CMD ["npm", "start"]