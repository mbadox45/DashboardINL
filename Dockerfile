# Use the official Node.js image (version 20)
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 8881
EXPOSE 8881

# Command to run the Vue.js application
CMD ["npm", "run", "dev"]
