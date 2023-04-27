#!/bin/bash
echo "STARTING GAMING LIBRARY"
# rm -rf node_modules
# Install the project dependencies
yarn install --network-concurrency 1
# yarn install
# Generate Prisma Client
npx prisma generate
# Create migrations from Prisma schema, apply them to the database, generate artifacts
npx prisma migrate dev
# npx prisma migrate dev --name <migration-name>
# npx prisma migrate deploy
# Start the API server on development mode
yarn run start:dev