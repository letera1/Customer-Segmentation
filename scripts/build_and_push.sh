#!/usr/bin/env bash
# ==============================================================================
# Build and Push Customer Segmentation Docker Images to Docker Hub
# Usage:
#   ./scripts/build_and_push.sh <dockerhub_username> [tag]
# Example:
#   ./scripts/build_and_push.sh myusername v2.0.0
# ==============================================================================

set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Error: Docker Hub username required."
  echo "Usage: $0 <dockerhub_username> [tag]"
  exit 1
fi

DOCKER_USER="$1"
TAG="${2:-latest}"

API_IMAGE="${DOCKER_USER}/customer-segmentation-api:${TAG}"
FRONTEND_IMAGE="${DOCKER_USER}/customer-segmentation-frontend:${TAG}"

echo "=========================================================="
echo " Building Customer Segmentation Docker Images"
echo " Hub Username: ${DOCKER_USER}"
echo " Tag         : ${TAG}"
echo "=========================================================="

echo -e "\n[1/4] Building Backend API image: ${API_IMAGE}..."
docker build -t "${API_IMAGE}" -f Dockerfile.api .

echo -e "\n[2/4] Building Next.js Frontend image: ${FRONTEND_IMAGE}..."
docker build -t "${FRONTEND_IMAGE}" ./frontend

if [ "${TAG}" != "latest" ]; then
  docker tag "${API_IMAGE}" "${DOCKER_USER}/customer-segmentation-api:latest"
  docker tag "${FRONTEND_IMAGE}" "${DOCKER_USER}/customer-segmentation-frontend:latest"
fi

echo -e "\n[3/4] Authenticating with Docker Hub..."
docker login

echo -e "\n[4/4] Pushing images to Docker Hub..."
docker push "${API_IMAGE}"
docker push "${FRONTEND_IMAGE}"

if [ "${TAG}" != "latest" ]; then
  docker push "${DOCKER_USER}/customer-segmentation-api:latest"
  docker push "${DOCKER_USER}/customer-segmentation-frontend:latest"
fi

echo -e "\nSuccessfully built and pushed all images to Docker Hub!"
