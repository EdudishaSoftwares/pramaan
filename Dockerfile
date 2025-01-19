# Base image: Use the latest LTS Node.js version (with Alpine)
FROM node:18-alpine AS development-build-stage

# Set environment variables
ARG DOCKER_ENV
ARG GITHUB_TOKEN
ENV NODE_ENV=${DOCKER_ENV}
ENV GITHUB_TOKEN=${GITHUB_TOKEN}

# Validate NODE_ENV is provided
RUN if [ -z "$NODE_ENV" ]; then echo "NODE_ENV not set" && exit 1; fi
RUN echo "Building for environment: $NODE_ENV"

# Define working directory
WORKDIR /home/ubuntu/github_repos/pramaan

# Copy project files to the container (excluding node_modules and package-lock.json)
COPY . /home/ubuntu/github_repos/pramaan

# Install PM2 globally
RUN npm install pm2 -g

# Install git for any required commands
RUN apk add git

# Install npm dependencies (fresh install after removing node_modules and package-lock.json)
RUN npm install

# Clone the secrets repository and checkout the specific branch based on DOCKER_ENV
RUN git clone -b ${NODE_ENV} https://${GITHUB_TOKEN}@github.com/pratik-edu/secrets.git /tmp/config-repo

# Copy the app configuration file to the correct location
RUN cp /tmp/config-repo/pramaan/config.json /home/ubuntu/github_repos/pramaan/src/config/config.${NODE_ENV}.json

# Copy the Nginx configuration file to the correct location
RUN cp /tmp/config-repo/pramaan/nginx.conf /etc/nginx/nginx.conf

# Clean up temporary files
RUN rm -rf /tmp/config-repo

# Create logs directory for PM2
RUN mkdir -p logs

# Build the application - THIS MUST COMPLETE BEFORE PM2 STARTS
RUN npm run build

# Verify the dist directory and server.js exist
RUN ls -la dist && ls -la dist/server.js
RUN ls -la src/config/config.${NODE_ENV}.json || echo "Config file missing!"

# Expose the port your app listens to
EXPOSE 3004

# Run the app using PM2
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "${NODE_ENV}"]
