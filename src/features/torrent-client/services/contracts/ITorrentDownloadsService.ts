import { AddTorrentDownloadCommand } from "../../commands/AddTorrentDownloadCommand";
import { GetTorrentDownloadResponse } from "../../responses/GetTorrentDownloadResponse";

export type Result<T, E> = { success: true; data: T } | { success: false; error: E };

export interface ITorrentDownloadsService {
    getMagnetUrl(pageUrl: string): Promise<string>;
    getTorrents(): Promise<GetTorrentDownloadResponse[]>;
    addTorrent(magnetUrl: string, request: AddTorrentDownloadCommand, outputDir: string): Promise<Result<GetTorrentDownloadResponse, string>>;
    deleteTorrent(magnetUrl: string): Promise<boolean>;
}
