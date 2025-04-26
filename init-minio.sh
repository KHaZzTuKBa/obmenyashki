#!/bin/sh

# Дожидаемся, пока MinIO сервер станет доступен внутри контейнера
# Это простой вариант, можно использовать более надежные проверки
sleep 5

# Устанавливаем alias для локального MinIO сервера
# Используем localhost, т.к. скрипт выполняется ВНУТРИ контейнера minio
# Переменные окружения MINIO_ROOT_USER и MINIO_ROOT_PASSWORD доступны из docker-compose
mc alias set local http://localhost:9000 ${MINIO_USER} ${MINIO_PASSWORD}

# Создаем бакет, если он еще не существует
# Используем переменную окружения для имени бакета
# Флаг --ignore-existing позволяет команде не падать, если бакет уже есть
mc mb local/${MINIO_DEFAULT_BUCKET} --ignore-existing

# Устанавливаем политику 'download' (публичное чтение) для бакета
# Это разрешит анонимные GET запросы к объектам в этом бакете
mc policy set download local/${MINIO_DEFAULT_BUCKET}

mc cors set local/project-images cors.json

echo "MinIO initialized: Bucket '${MINIO_DEFAULT_BUCKET}' created (if not existed) and set to public read."

exit 0