#!/bin/bash

# Generate a unique user identifier
UNIQUE_USER_ID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 8 | head -n 1)
USER_DIR="/app/user/$UNIQUE_USER_ID"

# Create user-specific directory
mkdir -p "$USER_DIR"
cd "$USER_DIR"

# Generate Prisma client for this user
npx prisma generate --schema=/app/prisma/schema.prisma

# Start the application with user-specific environment
NODE_ENV=production USER_ID=$UNIQUE_USER_ID node /app/index.js