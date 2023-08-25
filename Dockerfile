# Use a build argument to pass the repository URL during build
ARG REPO_URL
FROM node:16

# Clone the repository
RUN git clone ${REPO_URL} /usr/src/app

# Continue with your existing Dockerfile content
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package*.json ./
RUN npm ci --only=production
CMD ["npm", "run", "build"]
