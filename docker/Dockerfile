FROM node:18-alpine3.15

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY package.json yarn.lock ./
COPY tsconfig* ./
COPY nest-cli.json ./
COPY prisma/ prisma/
COPY src/ src/
COPY docker/docker-entrypoint.sh docker-entrypoint.sh

# Building your code for production
RUN apk add git
RUN yarn install --network-concurrency 1
# RUN npx prisma generate
RUN yarn build
EXPOSE ${SERVICE_PORT}

ENTRYPOINT ["sh", "/usr/src/app/docker-entrypoint.sh"]