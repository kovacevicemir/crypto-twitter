FROM node:latest

# Copy app source
COPY . /

# Create app directory
WORKDIR /

# Set Environmental variables
ENV PORT=5000

# Install app dependencies
RUN npm install
RUN npm install --save @google-cloud/storage

# Export port to outside world
EXPOSE 5000

# Start command as per package.json
CMD ["npm", "start"]