import { GetHtmlCommand } from "@/features/torrent-client/commands/GetHtmlCommand";
import { GetHtmlResponse } from "@/features/torrent-client/responses/GetHtmlResponse";

export interface IHttpClient {
    getHtml(command: GetHtmlCommand): Promise<GetHtmlResponse>;
} 