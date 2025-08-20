import { inject, injectable } from 'tsyringe';
import WebTorrent from 'webtorrent';
import { AddTorrentDownloadCommand } from '../commands/AddTorrentDownloadCommand';
import DictionaryCache from '../../_shared/utils/DictionaryCache';
import { GetTorrentDownloadResponse } from '../responses/GetTorrentDownloadResponse';
import { ITorrentDownloadsService, Result } from './contracts/ITorrentDownloadsService';
import { IHttpClient } from '../../_shared/contracts/IHttpClient';
import { GetHtmlCommand } from '../commands/GetHtmlCommand';

const client = new WebTorrent();
const downloadCache = new DictionaryCache<{ magnetUrl: string } & AddTorrentDownloadCommand>();

@injectable()
export default class TorrentDownloadsService implements ITorrentDownloadsService {
    private httpClient: IHttpClient;

    constructor(
        @inject('IHttpClient') httpClient: IHttpClient) {
        this.httpClient = httpClient;
    }

    public async getMagnetUrl(pageUrl: string): Promise<string> {
        const url = pageUrl;

        console.log(`Fetching magnet URL from page: ${url}`);
        const { html } = await this.httpClient.getHtml({
            url,
            useCache: false,
            useBasicHttpClient: false
        } as GetHtmlCommand);
        console.log(`HTML content fetched successfully from ${url}`);
        const magnetUrls: string[] = [];
        const magnetRegex = /magnet:\?xt=urn:btih:[a-zA-Z0-9]{32,40}[^"' \t\n\r<]*[^"' \t\n\r<]*/g;

        let match;
        while ((match = magnetRegex.exec(html)) !== null) {
            magnetUrls.push(match[0]);
        }

        console.log(`Found ${magnetUrls.length} magnet URLs in the page: ${url}`);

        return magnetUrls[0];
    }

    public async getTorrents(): Promise<GetTorrentDownloadResponse[]> {
        const items = client.torrents
            .filter(torrent => torrent.name?.length > 0)
            .map(torrent => {
                const cacheEntry = Array.from(downloadCache.entries()).find(([_, value]) => value.magnetUrl === torrent.magnetURI);
                const cachedData = cacheEntry ? cacheEntry[1] : null;

                const result: GetTorrentDownloadResponse = {
                    Name: torrent.name,
                    MagnetUrl: torrent.magnetURI,
                    Progress: torrent.progress * 100,
                    Seeds: cachedData?.Seeds || 0,
                    Leechers: cachedData?.Leechers || 0,
                    Size: cachedData?.Size || '0 MB',
                    Provider: cachedData?.Provider || ''
                };
                return result;
            }
            );
        console.log(`Torrents returned successfully`);
        return items;
    };

    public addTorrent(magnetUrl: string, request: AddTorrentDownloadCommand, outputDir: string): Promise<Result<GetTorrentDownloadResponse, string>> {
        return new Promise(async (resolve, _reject) => {
            try {
                client.add(magnetUrl, { path: outputDir }, (torrent) => {
                    const response: GetTorrentDownloadResponse = {
                        Name: torrent.name,
                        MagnetUrl: torrent.magnetURI,
                        Progress: torrent.progress,
                        Seeds: request.Seeds,
                        Leechers: request.Leechers,
                        Size: request.Size,
                        Provider: request.Provider
                    };
                    downloadCache.add(torrent.magnetURI, { ...request, magnetUrl: torrent.magnetURI });
                    console.log(`Torrent '${response.Name}' added successfully to ${outputDir}`);
                    resolve({ success: true, data: response });
                });
            } catch (error) {
                resolve({ success: false, error: `An unexpected error occured while adding torrent` });
            }
        });
    };

    public deleteTorrent(magnetUrl: string): Promise<boolean> {
        return new Promise(async (resolve, _reject) => {
            const cachedData = downloadCache.get(magnetUrl);
            if (!cachedData) {
                resolve(false);
                return;
            }

            client.remove(cachedData.magnetUrl, { destroyStore: true }, () => {
                downloadCache.remove(magnetUrl);
                console.log(`Torrent deleted successfully`);
                resolve(true);
            });
        });
    };
}
