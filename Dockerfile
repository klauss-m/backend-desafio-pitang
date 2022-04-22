FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# ENV DATABASE_URL ${DATABASE_URL}
RUN --mount=type=secret,DATABASE_URL=DATABASE_URL \
    cat /run/secrets/DATABASE_URL

CMD ["node", "build/index.js"]