# The builder from node image
FROM node:12.2.0-alpine as builder

#RUN apk update && apk add --no-cache make git
RUN apk --no-cache add python make g++

# Move our files into directory name "app"
WORKDIR /app
COPY package.json  /app/
RUN npm install @angular/cli@8.0.1 -g
RUN cd /app && npm install
COPY .  /app/

RUN cd /app && npm run-script build

# Build a small nginx image with static website
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/
COPY --from=builder /app/dist/ng-mysmoothie /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
