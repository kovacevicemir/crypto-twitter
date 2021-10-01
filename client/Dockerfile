FROM node:latest

# Copy app source
COPY . /

# Create app directory
WORKDIR /

# Set Environmental Variables
ENV PORT=3000

# Install app dependencies
RUN npm install

# Export port to outside world
EXPOSE 3000

# Start command as per package.json
CMD ["npm", "start"]
