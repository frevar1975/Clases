# Dockerfile

# Use the official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /opt/app

# Copy the source code to the container /opt/app directory
COPY . .

# Install dependencies
RUN npm install

# Expose the port that the application will use
EXPOSE 3000

# Start the application
CMD ["npm", "start"]