FROM node:14.18-alpine as base
WORKDIR /app
COPY ./ /app

FROM base as local
RUN yarn install
CMD ["yarn", "dev"]