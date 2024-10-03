#!/bin/bash

# Generate a unique user identifier
UNIQUE_USER_ID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 8 | head -n 1)
USER_DIR="/app/$UNIQUE_USER_ID"  # Change this line

# Create user-specific directory
mkdir -p "$USER_DIR"
cd "$USER_DIR"

# Set APP_DIR environment variable
export APP_DIR="$USER_DIR"  # Add this line

# Set UNIQUE_USER_ID environment variable
export UNIQUE_USER_ID="$UNIQUE_USER_ID"  # Add this line

# Generate Prisma client for this user
npx prisma generate --schema=/app/prisma/schema.prisma

# Start the application with user-specific environment
exec node /app/index.js