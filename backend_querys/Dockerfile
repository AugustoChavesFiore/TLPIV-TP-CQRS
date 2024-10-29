FROM node:20-alpine3.19 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:20-alpine3.19 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:20-alpine3.19 AS runner
# Install tzdata for timezone
RUN apk add --no-cache tzdata
ENV TZ=America/Argentina/Buenos_Aires

# Set working directory
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install 

COPY --from=builder /app/dist ./dist

# Copiar el directorio y su contenido
RUN mkdir -p ./querys
COPY --from=builder ./app/dist/ ./app
COPY ./.env ./app/.env

# Dar permiso para ejecutar la applicación
RUN adduser --disabled-password user
RUN chown -R user:user /usr/src/app
USER user

EXPOSE 3000

CMD [ "node", "dist/app.js" ]