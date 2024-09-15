
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    curl \
    python3 \
    make \
    g++ \
    bash \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -s /bin/bash appuser


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p /app/user \
    && chown -R appuser:appuser /app \
    && chmod -R 755 /app

USER appuser

WORKDIR /app/user


EXPOSE 9000

CMD ["node", "/app/index.js"]
