# Этап сборки (Builder)
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем package.json и package-lock.json в первую очередь для кэширования
COPY package*.json ./

# Устанавливаем зависимости (включая devDependencies для сборки)
RUN npm ci

# Копируем остальные файлы проекта
COPY . .

# Устанавливаем переменную окружения NODE_ENV
ENV NODE_ENV=production

# Очищаем каталог dist перед сборкой
RUN rm -rf dist

# Собираем приложение для production
RUN npm run build && ls -la /app/dist

# Этап production
FROM nginx:1.25-alpine

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранное приложение из builder
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]