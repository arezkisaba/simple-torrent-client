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