# Base image
FROM node:21.7.1

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy application source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the port on which the app will run
#EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start:prod"]
