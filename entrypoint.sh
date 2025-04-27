#!/bin/sh
set -e

minio "$@" &

MINIO_PID=$!

sleep 2

if [ -f /setup-minio.sh ]; then
  echo "Running setup script..."
  chmod +x /setup-minio.sh
  /setup-minio.sh
else
  echo "Setup script not found, skipping."
fi

wait $MINIO_PID