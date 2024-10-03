#!/bin/bash

# Generate a unique user identifier
UNIQUE_USER_ID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 8 | head -n 1)
USER_DIR="/app/user/$UNIQUE_USER_ID"

# Create user-specific directory
mkdir -p "$USER_DIR"
cd "$USER_DIR"

# Export the unique user ID as an environment variable
export UNIQUE_USER_ID

# Generate Prisma client for this user
npx prisma generate --schema=/app/prisma/schema.prisma

# Start the application with user-specific environment
exec node /app/index.js