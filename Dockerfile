FROM node:13.12.0-alpine

# Create app directory
WORKDIR /app


# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

EXPOSE 80
EXPOSE 8080
EXPOSE 443
EXPOSE 3000
CMD [ "npm", "start" ]