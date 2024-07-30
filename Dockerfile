# Step 1: Build the application
FROM node:20 AS development
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
# RUN npm ci

COPY . .
RUN yarn
RUN yarn build

FROM development AS build

RUN npm run build

FROM development as dev-envs
RUN apt-get update
RUN apt-get install -y --no-install-recommends git

RUN useradd -s /bin/bash -m vscode
RUN groupadd docker
RUN usermod -aG docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]


# Step 2: Set up the production environment
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY /.nginx/templates/nginx.conf.template  /etc/nginx/templates/nginx.conf.template 
COPY --from=build /app/build /usr/share/nginx/html

CMD ["/bin/sh" , "-c" , "envsubst '$PORT' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
