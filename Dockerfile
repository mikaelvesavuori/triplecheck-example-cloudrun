FROM node:15-alpine

WORKDIR /src
COPY ./src .
RUN npm install --only=production
EXPOSE 8080
CMD npm start