FROM node:18.12.0-slim
COPY . ./nestquanzhan
WORKDIR /nestquanzhan
RUN yarn install
CMD yarn start:dev
