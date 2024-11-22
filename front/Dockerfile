FROM node:19-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.21-alpine

COPY --from=build /app/out /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/set-envs.sh /docker-entrypoint.d/set-envs.sh
RUN chmod +x /docker-entrypoint.d/set-envs.sh

CMD ["nginx", "-g", "daemon off;"]