# Docker Deployment & Docker Hub Publishing Guide

This guide covers building, running, and publishing the **Customer Segmentation Platform** Docker containers to **Docker Hub**.

---

## 1. Container Architecture

The system consists of two optimized containers:

| Container | Base Image | Role | Port | Health Check |
|---|---|---|---|---|
| **`customer-segmentation-api`** | `python:3.11-slim` | FastAPI ML serving, K-Means clustering, and scikit-learn models | `8000` | `GET /health` |
| **`customer-segmentation-frontend`** | `node:20-alpine` | Next.js 15 standalone executive UI | `3000` | `GET /` |

Both containers run with non-root security principles, minimal build contexts via `.dockerignore`, and embedded health checks.

---

## 2. Quick Local Run with Docker Compose

To build and run both containers locally in an isolated bridge network:

```bash
docker compose up --build
```

- **Frontend Dashboard**: Open [http://localhost:3000](http://localhost:3000)
- **FastAPI Backend**: Open [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger Docs**: Open [http://localhost:8000/docs](http://localhost:8000/docs)

To stop the containers:
```bash
docker compose down
```

---

## 3. Automated Build & Push to Docker Hub

Automated scripts are provided in `scripts/`:

### Using PowerShell (Windows)
```powershell
.\scripts\build_and_push.ps1 -DockerHubUsername "YOUR_DOCKERHUB_USERNAME" -Tag "v2.0.0"
```

### Using Bash (Linux / macOS)
```bash
chmod +x ./scripts/build_and_push.sh
./scripts/build_and_push.sh YOUR_DOCKERHUB_USERNAME v2.0.0
```

---

## 4. Manual Step-by-Step Instructions

If you prefer executing the Docker commands manually:

### Step 1: Log in to Docker Hub
```bash
docker login
```
Enter your Docker Hub username and password (or Personal Access Token).

### Step 2: Build and Tag the Backend API Image
From the repository root:
```bash
docker build -t YOUR_DOCKERHUB_USERNAME/customer-segmentation-api:v2.0.0 -f Dockerfile.api .
docker tag YOUR_DOCKERHUB_USERNAME/customer-segmentation-api:v2.0.0 YOUR_DOCKERHUB_USERNAME/customer-segmentation-api:latest
```

### Step 3: Build and Tag the Next.js Frontend Image
```bash
docker build -t YOUR_DOCKERHUB_USERNAME/customer-segmentation-frontend:v2.0.0 ./frontend
docker tag YOUR_DOCKERHUB_USERNAME/customer-segmentation-frontend:v2.0.0 YOUR_DOCKERHUB_USERNAME/customer-segmentation-frontend:latest
```

### Step 4: Push Images to Docker Hub
```bash
# Push Backend API
docker push YOUR_DOCKERHUB_USERNAME/customer-segmentation-api:v2.0.0
docker push YOUR_DOCKERHUB_USERNAME/customer-segmentation-api:latest

# Push Frontend
docker push YOUR_DOCKERHUB_USERNAME/customer-segmentation-frontend:v2.0.0
docker push YOUR_DOCKERHUB_USERNAME/customer-segmentation-frontend:latest
```

---

## 5. Pulling & Running from Docker Hub on Any Server

Once published, anyone or any cloud server can pull and run the application without needing source code:

```bash
# 1. Run the Backend API
docker run -d \
  --name segmentai-api \
  -p 8000:8000 \
  --restart unless-stopped \
  YOUR_DOCKERHUB_USERNAME/customer-segmentation-api:latest

# 2. Run the Frontend Dashboard
docker run -d \
  --name segmentai-frontend \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000 \
  --restart unless-stopped \
  YOUR_DOCKERHUB_USERNAME/customer-segmentation-frontend:latest
```

---

## 6. Continuous Deployment with GitHub Actions

The repository includes a ready-to-use GitHub Actions workflow at `.github/workflows/docker-publish.yml`.

To enable automatic Docker Hub publishing on every `git push`:
1. Go to your repository **Settings > Secrets and variables > Actions**.
2. Add the following repository secrets:
   - `DOCKERHUB_USERNAME`: Your Docker Hub account username.
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token (generated in Docker Hub under **Account Settings > Security > New Access Token**).
3. Push changes to the `main` branch or create a git release tag (`v2.0.0`), and GitHub Actions will automatically build, tag, and publish the images.
