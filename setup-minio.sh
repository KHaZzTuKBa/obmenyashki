#!/bin/sh
set -e # Выход при ошибке

echo "Waiting for Minio server to start..."

until mc alias set local http://localhost:9000 ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}; do
    echo -n "."
    sleep 1
done
echo " Minio server is up!"

if [ -z "${MINIO_ROOT_USER}" ] || [ -z "${MINIO_ROOT_PASSWORD}" ] || [ -z "${MINIO_DEFAULT_BUCKET}" ]; then
  echo "Error: MINIO_ROOT_USER, MINIO_ROOT_PASSWORD, and MINIO_DEFAULT_BUCKET environment variables must be set."
  exit 1
fi

echo "Creating bucket '${MINIO_DEFAULT_BUCKET}' if it doesn't exist..."
mc --quiet mb local/${MINIO_DEFAULT_BUCKET} || echo "Bucket '${MINIO_DEFAULT_BUCKET}' already exists."

echo "Setting bucket '${MINIO_DEFAULT_BUCKET}' policy to public download..."
#mc --quiet policy set download local/${MINIO_DEFAULT_BUCKET}
mc --quiet anonymous set download local/${MINIO_DEFAULT_BUCKET}

echo "Minio setup complete. Bucket '${MINIO_DEFAULT_BUCKET}' is public."

exit 0