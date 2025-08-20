# Simple HTTP Client

A Node.js backend service built with Express that provides HTTP client functionality. This project includes CORS support, Swagger API documentation, and IP checking middleware.

## Features

- RESTful API for making HTTP requests
- Swagger UI API documentation at `/api-docs`
- IP validation middleware
- Cross-Origin Resource Sharing (CORS) support
- Containerized with Docker
- Puppeteer support for browser automation

## Build Instructions

All configuration is centralized in the `.env` file. Use the provided script to automatically build and run with correct paths and Docker network:

```bash
# Make script executable
chmod +x docker-run.sh

# Build and run with .env configuration and Docker network
./docker-run.sh

# Or manually build and run with Docker network
docker build -t simple-torrent-client:latest .
docker network create simple-torrent-net || true
docker run --network simple-torrent-net -p 4446:4446 -v /media/Babylon/.TorrentApi-Dev:/app/media simple-torrent-client:latest
```

## Docker Network for Inter-Container Communication

This project uses a Docker network (`simple-torrent-net`) to allow communication between containers.  
If you run another container (e.g., an API your app needs to call), run it with the same network:

```bash
docker run --network simple-torrent-net --name other-api ...other-api-image...
```

Then, use `other-api` as the hostname in your configuration or `.env` file for inter-container requests.

## Volumes Management

The application uses paths configured in `.env` file automatically via the docker-run.sh script.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
