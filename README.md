# Simple Torrent Client

A containerized torrent client application built with Node.js, TypeScript, and Express that provides REST API endpoints for managing torrent downloads.

## Features

- **REST API**: Add, retrieve, and delete torrent downloads via HTTP endpoints
- **Magnet URL Support**: Automatically extracts magnet URLs from torrent pages
- **Docker Support**: Fully containerized with Docker networking
- **Environment Configuration**: Configurable via environment variables
- **Swagger Documentation**: Auto-generated API documentation
- **Volume Mounting**: Persistent download storage

## Project Structure

```
src/
├── features/
│   └── torrent-client/
│       ├── routes/TorrentClientRoutes.ts
│       ├── services/TorrentDownloadsService.ts
│       ├── commands/
│       └── responses/
├── container/
└── ...
```

## API Endpoints

### GET /api/torrent-client
Retrieve a list of active torrent downloads.

### POST /api/torrent-client
Add a new torrent to downloads.
- **Body**: `AddTorrentDownloadCommand` with `PageUrl` field

### DELETE /api/torrent-client
Delete a torrent from downloads.
- **Body**: `DeleteTorrentDownloadCommand` with `MagnetUrl` field

## Environment Variables

Create a `.env` like `.env.example`:

## Docker Setup

### Prerequisites
- Docker and Docker Network support
- The application communicates with another service on port 4445

### Running the Application

1. **Clone the repository**
```bash
git clone <repository-url>
cd simple-torrent-client
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Run with Docker**
```bash
chmod +x docker-run.sh
./docker-run.sh
```

The script will:
- Parse environment variables from `.env`
- Create a Docker network (`simple-net`)
- Build the Docker image
- Stop any existing containers
- Run the new container with proper networking and volume mounting

### Docker Network

The application uses a custom Docker network (`simple-net`) to communicate with other containerized services. Make sure any dependent services (like the one on port 4445) are also connected to this network:

```bash
docker run -d --name other-api --network simple-net -p 4445:4445 your-other-image:latest
```

## Development

### Local Development
```bash
npm install
npm run dev
```

### Building
```bash
npm run build
```

### Testing
```bash
npm test
```

## Error Handling

The application provides comprehensive error responses including:
- Error message and type
- Stack traces (in development)
- Request details (URL, method, headers)
- Timestamp and environment information

## Dependencies

- **Express**: Web framework
- **TypeScript**: Type safety
- **TSyringe**: Dependency injection
- **Swagger**: API documentation

## License

[License information]

## Contributing

[Contributing guidelines]
