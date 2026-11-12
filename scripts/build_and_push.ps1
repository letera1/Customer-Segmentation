<#
.SYNOPSIS
    Builds and pushes Customer Segmentation Docker images to Docker Hub.

.DESCRIPTION
    Builds the FastAPI ML API container and Next.js Frontend container,
    tags them with your Docker Hub username and version, and pushes them.

.EXAMPLE
    .\scripts\build_and_push.ps1 -DockerHubUsername "yourusername" -Tag "v2.0.0"
#>

param (
    [Parameter(Mandatory = $true, HelpMessage = "Your Docker Hub username")]
    [string]$DockerHubUsername,

    [Parameter(Mandatory = $false)]
    [string]$Tag = "latest",

    [Parameter(Mandatory = $false)]
    [switch]$SkipPush = $false
)

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Building Customer Segmentation Docker Images" -ForegroundColor Cyan
Write-Host " Hub Username: $DockerHubUsername" -ForegroundColor White
Write-Host " Tag         : $Tag" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan

$ApiImageName = "$DockerHubUsername/customer-segmentation-api:$Tag"
$FrontendImageName = "$DockerHubUsername/customer-segmentation-frontend:$Tag"

# 1. Build Backend API Image
Write-Host "`n[1/4] Building FastAPI ML API image: $ApiImageName..." -ForegroundColor Green
docker build -t $ApiImageName -f Dockerfile.api .

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to build Backend API image."
}

# 2. Build Frontend Image
Write-Host "`n[2/4] Building Next.js Frontend image: $FrontendImageName..." -ForegroundColor Green
docker build -t $FrontendImageName ./frontend

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to build Frontend image."
}

# 3. Also tag as latest if a custom version was supplied
if ($Tag -ne "latest") {
    $ApiLatest = "$DockerHubUsername/customer-segmentation-api:latest"
    $FrontendLatest = "$DockerHubUsername/customer-segmentation-frontend:latest"
    docker tag $ApiImageName $ApiLatest
    docker tag $FrontendImageName $FrontendLatest
}

# 4. Push to Docker Hub
if (-not $SkipPush) {
    Write-Host "`n[3/4] Authenticating with Docker Hub..." -ForegroundColor Green
    Write-Host "If not already logged in, enter your credentials below:" -ForegroundColor Yellow
    docker login

    Write-Host "`n[4/4] Pushing images to Docker Hub..." -ForegroundColor Green
    Write-Host "Pushing $ApiImageName..."
    docker push $ApiImageName

    Write-Host "Pushing $FrontendImageName..."
    docker push $FrontendImageName

    if ($Tag -ne "latest") {
        docker push "$DockerHubUsername/customer-segmentation-api:latest"
        docker push "$DockerHubUsername/customer-segmentation-frontend:latest"
    }

    Write-Host "`nSuccessfully pushed images to Docker Hub!" -ForegroundColor Green
    Write-Host "Backend : https://hub.docker.com/r/$DockerHubUsername/customer-segmentation-api" -ForegroundColor Cyan
    Write-Host "Frontend: https://hub.docker.com/r/$DockerHubUsername/customer-segmentation-frontend" -ForegroundColor Cyan
} else {
    Write-Host "`nImages built successfully. Push skipped due to -SkipPush switch." -ForegroundColor Yellow
}
