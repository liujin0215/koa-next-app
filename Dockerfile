FROM node:18

RUN mkdir -p /app
WORKDIR /app
COPY . /usr/src/app/

# install
RUN npm ci 

# build
RUN npm run build && npm run tsc

# start
CMD npm run serve