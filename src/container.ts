import 'reflect-metadata';
import { container } from 'tsyringe';
import { ITorrentDownloadsService } from './features/torrent-client/services/contracts/ITorrentDownloadsService';
import TorrentDownloadsService from './features/torrent-client/services/TorrentDownloadsService';
import { IHttpClient } from './features/_shared/contracts/IHttpClient';
import CustomHttpClient from './features/_shared/CustomHttpClient';

const TOKENS = {
    IHttpClient: 'IHttpClient',
    ITorrentDownloadsService: 'ITorrentDownloadsService',
} as const;

container.register<IHttpClient>(TOKENS.IHttpClient, {
    useClass: CustomHttpClient
});

container.register<ITorrentDownloadsService>(TOKENS.ITorrentDownloadsService, {
    useClass: TorrentDownloadsService
});

export { container, TOKENS };