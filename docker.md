# Docker Setup Guide

## 1. Dockerfile
A Dockerfile is a script that contains instructions to build a Docker image.

🔹 Purpose:
- Automates the creation of Docker images.
- Defines the environment your app needs to run.

🔹 Key Instructions:
- FROM: Base image.
- COPY: Copy files into the image.
- RUN: Execute commands (e.g., install packages).
- CMD: Default command to run when the container starts.

## 2. docker-compose.yml
A docker-compose.yml file is used to define and run multi-container Docker applications.

🔹 Purpose:
- Manages multiple containers (e.g., app + database).
- Simplifies container orchestration.

🔹 Key Concepts:
- services: Defines each container (e.g., web, db).
- build: Tells Docker to build from a Dockerfile.
- image: Use a prebuilt image.
- ports: Maps container ports to host.
- volumes: Mounts host directories into the container.
- environment: Sets environment variables.

## 🔄 How They Work Together?
- You write a Dockerfile to define how to build your app’s image.
- You use docker-compose.yml to run that image along with other services (like databases) in a coordinated way.

## Files Overview

- `Dockerfile` - Simple development Dockerfile
- `Dockerfile.prod` - Multi-stage production Dockerfile with security best practices
- `docker-compose.yml` - Development environment with hot reload
- `docker-compose.prod.yml` - Production environment
- `docker-helper.ps1` - PowerShell script for easy Docker management

## Development Mode

The development setup includes:
- Hot reload with volume mounting
- Database sync enabled
- Detailed logging
- Development dependencies

### Start Development Environment

```powershell
# Quick start Redis only
docker-compose up --build

# start dev envt 
docker compose -f docker-compose.file.yml up -d --build

# Quick start my dev
docker-compose.file up --build

# Or run detached
docker-compose.file up -d --build

# View logs
docker-compose.file logs -f nestjs-app
```

## Production Mode

The production setup includes:
- Multi-stage build for smaller image size
- Non-root user for security
- Production dependencies only
- Health checks
- Proper logging setup

### Start Production Environment

```powershell
# Quick start
docker-compose -f docker-compose.prod.yml up --build

# Or run detached
docker compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f nestjs-app.prod
```

## Environment Variables

### Development
Uses `.env` file with development-friendly settings.

### Production
1. Copy `.env.prod.example` to `.env.prod`
2. Update all values with strong, unique passwords and secrets
3. The production compose file will automatically use these values

## Useful Commands

```powershell
# Use the helper script
.\docker-helper.ps1

# Stop everything
docker-compose.file down
docker compose -f docker-compose.file.yml down
docker-compose.file -f docker-compose.prod.yml down

# Clean up volumes (WARNING: This deletes data)
docker-compose.file down -v

# Rebuild without cache
docker-compose.file build --no-cache

# Check status
docker-compose.file ps

#clean up
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.dev.yml down

# check running containers 
docker ps
```

## Ports

- **Dev**: `http://localhost:8000`
- **Production**: `http://localhost:80` (mapped to container port 8000)
- **Database**: `localhost:5432`
- **Redis**: `localhost:6379`

## Health Checks

Production containers include health checks:
- NestJS app: HTTP health endpoint
- PostgreSQL: `pg_isready` command
- Redis: `ping` command

## Security Features (Production)

- Non-root user (`nestjs`)
- Multi-stage build (smaller attack surface)
- Production dependencies only
- Proper file permissions
- Health monitoring
- Environment variable validation
