#!/bin/sh
set -e # Выход при ошибке

# Переменные окружения будут переданы из docker-compose.yml
# MINIO_ROOT_USER, MINIO_ROOT_PASSWORD, MINIO_BUCKET_NAME

# Ожидание запуска сервера Minio
echo "Waiting for Minio server to start..."
# Простой способ: подождать несколько секунд (не самый надежный)
# sleep 5
# Более надежный способ: пинговать health-эндпоинт или использовать mc admin info
# Ожидание, пока mc сможет подключиться
until mc alias set local http://localhost:9000 ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}; do
    echo -n "."
    sleep 1
done
echo " Minio server is up!"

# Проверка наличия необходимых переменных (хорошо добавить)
if [ -z "${MINIO_ROOT_USER}" ] || [ -z "${MINIO_ROOT_PASSWORD}" ] || [ -z "${MINIO_DEFAULT_BUCKET}" ]; then
  echo "Error: MINIO_ROOT_USER, MINIO_ROOT_PASSWORD, and MINIO_DEFAULT_BUCKET environment variables must be set."
  exit 1
fi

# Создание бакета, если он еще не существует
# Флаг --quiet подавляет вывод, || true предотвращает ошибку, если бакет уже есть
echo "Creating bucket '${MINIO_DEFAULT_BUCKET}' if it doesn't exist..."
mc --quiet mb local/${MINIO_DEFAULT_BUCKET} || echo "Bucket '${MINIO_DEFAULT_BUCKET}' already exists."

# Установка политики 'download' (публичный доступ на чтение) для бакета
echo "Setting bucket '${MINIO_DEFAULT_BUCKET}' policy to public download..."
#mc --quiet policy set download local/${MINIO_DEFAULT_BUCKET}
mc --quiet anonymous set download local/${MINIO_DEFAULT_BUCKET}

echo "Minio setup complete. Bucket '${MINIO_DEFAULT_BUCKET}' is public."

exit 0