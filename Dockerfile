# Use the official Node.js 16 image as the base
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]
