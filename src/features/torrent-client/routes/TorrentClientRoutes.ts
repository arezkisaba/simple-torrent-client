import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { TOKENS } from '../../../container';
import { GetTorrentDownloadResponse } from '../responses/GetTorrentDownloadResponse';
import { AddTorrentDownloadCommand } from '../commands/AddTorrentDownloadCommand';
import { DeleteTorrentDownloadCommand } from '../commands/DeleteTorrentDownloadCommand';
import TorrentDownloadsService from '../services/TorrentDownloadsService';

const router = Router();

/**
 * @swagger
 * /api/torrent-downloads:
 *   get:
 *     summary: Retrieve a list of active torrents
 *     responses:
 *       200:
 *         description: A list of torrents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetTorrentDownloadResponse'
 */
router.get('/api/torrent-client', async (req: Request, res: Response) => {
    try {
        const torrentDownloadsService = container.resolve<TorrentDownloadsService>(TOKENS.ITorrentDownloadsService);
        const torrents: GetTorrentDownloadResponse[] = await torrentDownloadsService.getTorrents();
        res.json(torrents);
    } catch (error) {
        const errorResponse = {
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            error: error instanceof Error ? error.name : 'UnknownError',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString(),
            url: req.originalUrl,
            method: req.method,
            path: req.path,
            query: req.query,
            params: req.params,
            headers: req.headers,
            userAgent: req.get('User-Agent'),
            ip: req.ip,
            status: 500,
            environment: process.env.NODE_ENV || 'development'
        };
        console.error('Error in GET /api/torrent-client:', errorResponse);
        res.status(500).json(errorResponse);
    }
});

/**
 * @swagger
 * /api/torrent-downloads:
 *   post:
 *     summary: Add a new torrent to downloads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddTorrentDownloadRequest'
 *     responses:
 *       201:
 *         description: Torrent added successfully, but no content returned 
 */
router.post('/api/torrent-client', async (req: Request, res: Response) => {
    try {
        console.log(`Received request to add torrent with body: ${JSON.stringify(req.body)}`);
        const request = req.body as AddTorrentDownloadCommand;
        const torrentDownloadsService = container.resolve<TorrentDownloadsService>(TOKENS.ITorrentDownloadsService);
        const magnetUrl = await torrentDownloadsService.getMagnetUrl(request.PageUrl);
        const result = await torrentDownloadsService.addTorrent(magnetUrl, request, process.env.VOLUME_CONTAINER_DOWNLOAD_PATH as string);
        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json({ message: result.error });
        }
    } catch (error) {
        const errorResponse = {
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            error: error instanceof Error ? error.name : 'UnknownError',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString(),
            url: req.originalUrl,
            method: req.method,
            path: req.path,
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers,
            userAgent: req.get('User-Agent'),
            ip: req.ip,
            status: 500,
            environment: process.env.NODE_ENV || 'development'
        };
        console.error('Error in POST /api/torrent-client:', errorResponse);
        res.status(500).json(errorResponse);
    }
});

/**
 * @swagger
 * /api/torrent-downloads:
 *   delete:
 *     summary: Delete a torrent from downloads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteTorrentDownloadRequest'
 *     responses:
 *       200:
 *         description: Torrent deleted successfully
 */
router.delete('/api/torrent-client', async (req: Request, res: Response) => {
    try {
        const request = req.body as DeleteTorrentDownloadCommand;
        const torrentDownloadsService = container.resolve<TorrentDownloadsService>(TOKENS.ITorrentDownloadsService);
        await torrentDownloadsService.deleteTorrent(request.MagnetUrl);
        res.status(200).send();
    } catch (error) {
        const errorResponse = {
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            error: error instanceof Error ? error.name : 'UnknownError',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString(),
            url: req.originalUrl,
            method: req.method,
            path: req.path,
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers,
            userAgent: req.get('User-Agent'),
            ip: req.ip,
            status: 500,
            environment: process.env.NODE_ENV || 'development'
        };
        console.error('Error in DELETE /api/torrent-client:', errorResponse);
        res.status(500).json(errorResponse);
    }
});

export default router;