FROM node:16 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production
RUN npx prisma generate


COPY . .

COPY --from=development /app/dist ./dist
RUN npx prisma generate

CMD ["npm", "run","start:prod"]
