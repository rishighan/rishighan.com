FROM node:10.16.0
LABEL maintainer="Rishi Ghan <rishi.ghan@gmail.com>"

RUN mkdir -p /usr/src/rishighan.com
WORKDIR /usr/src/rishighan.com

COPY package.json /usr/src/rishighan.com
COPY ecosystem.config.js /usr/src/rishighan.com

#Install dependencies
RUN npm i -g pm2 && \
    npm i -g yarn && \
    yarn

COPY . /usr/src/rishighan.com
EXPOSE 8999

# This starts the app
CMD pm2 start --no-daemon --env production rgapp-pm2.json