FROM node:18

WORKDIR /app

# Copy package files from root
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend code from backend/ folder
COPY backend/ ./

CMD ["node", "server.js"]

