# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:16.19.0-alpine as build-stage

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# 
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm install
RUN npm install react-scripts@latest -g
COPY . /usr/src/app
RUN npm run build

# RUN CI=true npm test


# 2. For Nginx setup
FROM nginx:alpine
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

