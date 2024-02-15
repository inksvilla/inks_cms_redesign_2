FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .
COPY .env .

RUN yarn build

# Production Stage

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/inksvilla/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
