FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

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



# Create a non-root user
RUN useradd -m -s /bin/bash xelo_user

# Set working directory and copy package files
WORKDIR /app
COPY package*.json ./

# Install npm dependencies
RUN npm install --production && npm install node-pty

# Copy the rest of the application files including Prisma schema
COPY . .

RUN npx prisma generate


# Change ownership and permissions
RUN mkdir -p /app/user \
    && chown -R xelo_user:xelo_user /app \
    && chmod -R 755 /app

# Switch to non-root user for running application
USER xelo_user

# Set the working directory for the application (user cannot access /app)
WORKDIR /app/user

# Expose the port the application will run on
EXPOSE 9000

# Command to run the application (without migrations)
CMD ["node", "/app/index.js"]