FROM node:16.15.1-alpine as base
WORKDIR /app
COPY ./ /app

FROM base as local
RUN yarn install
CMD ["yarn", "dev"]