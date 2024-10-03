# FROM ubuntu:20.04

# ENV DEBIAN_FRONTEND=noninteractive

# # Install required packages and Node.js
# RUN apt-get update && apt-get install -y \
#     curl \
#     python3 \
#     openjdk-11-jdk \
#     make \
#     g++ \
#     bash \
#     git \
#     && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
#     && apt-get install -y nodejs \
#     && npm install -g typescript \
#     && rm -rf /var/lib/apt/lists/*

# # Create a non-root user
# RUN useradd -m -s /bin/bash xelo_user

# # Set working directory and copy package files
# WORKDIR /app
# COPY package*.json ./

# # Copy the rest of the application files including Prisma schema
# COPY . .

# # Install npm dependencies
# RUN npm install --production && npm install node-pty

# # Generate Prisma client using the schema located in /app/prisma/schema.prisma
# RUN npx prisma generate --schema=prisma/schema.prisma

# # Change ownership and permissions
# RUN mkdir -p /app/user \
#     && chown -R xelo_user:xelo_user /app \
#     && chmod -R 755 /app

# # Switch to non-root user for running application
# USER xelo_user

# # Set the working directory for the application (user cannot access /app)
# WORKDIR /app/user

# # Expose the port the application will run on
# EXPOSE 9000

# # Command to run the application (without migrations)
# CMD ["sh", "-c", "cd /app/user && npx prisma generate --schema=/app/prisma/schema.prisma && node /app/index.js"]









FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
ENV PORT=9000


# Install required packages and Node.js
RUN apt-get update && apt-get install -y \
    curl \
    python3 \
    openjdk-11-jdk \
    make \
    g++ \
    bash \
    git \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g typescript \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user with a dynamic username
ARG USERNAME=app_user
RUN useradd -m -s /bin/bash $USERNAME

# Set working directory
WORKDIR /app

# Copy all application files
COPY . .

# Install dependencies
RUN npm install --production && npm install node-pty

# Generate Prisma client
RUN npx prisma generate --schema=prisma/schema.prisma

# Setup user directory and permissions
# Do this BEFORE switching to non-root user
RUN mkdir -p /app/user \
    && chmod +x /app/start.sh \
    && chown -R $USERNAME:$USERNAME /app \
    && chmod -R 755 /app

# Switch to non-root user
USER $USERNAME

# Expose the port
EXPOSE $PORT

# Use the start script as the entry point
CMD ["/app/start.sh"]