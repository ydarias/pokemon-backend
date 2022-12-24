FROM node:18.12.1-alpine3.16 as builder

COPY . .

RUN yarn install

RUN yarn build

FROM node:18.12.1-alpine3.16 as dependencies

COPY package.json package.json

RUN yarn install --production

FROM node:18.12.1-alpine3.16 as runner

ENV NODE_ENV production

USER node

COPY --from=builder --chown=node:node ./dist ./dist

COPY --from=dependencies --chown=node:node ./node_modules ./node_modules

CMD ["dumb-init", "node", "dist/main"]






