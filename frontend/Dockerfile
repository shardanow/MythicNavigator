# Use a base image with Node.js >=20.0.0
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Upgrade npm (optional but recommended)
RUN npm install -g npm@latest

COPY . .

EXPOSE 3000

CMD ["npm", "start"]