export interface GetTorrentDownloadResponse {
    Name: string;
    MagnetUrl: string;
    Progress: number;
    Seeds: number;
    Leechers: number;
    Size: string;
    Provider: string;
}