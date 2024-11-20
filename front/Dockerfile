FROM node:19-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.21-alpine

COPY --from=build /app/out /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]