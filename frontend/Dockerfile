FROM node:alpine as BUILD_IMAGE
WORKDIR /app/react-app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine as PRODUCTION_IMAGE
WORKDIR /app/react-app
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/
EXPOSE 8080

COPY package.json .
COPY vite.config.js .
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "build"]
CMD ["npm", "run", "preview"]