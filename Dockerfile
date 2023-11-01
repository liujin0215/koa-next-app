FROM node:18

RUN mkdir -p /app
WORKDIR /app
COPY . /app/

# install
RUN npm ci 

# build
RUN npm run build && npm run tsc

# start
CMD npm run serve