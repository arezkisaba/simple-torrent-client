import { injectable } from 'tsyringe';
import { GetHtmlCommand } from '../torrent-client/commands/GetHtmlCommand';
import { GetHtmlResponse } from '../torrent-client/responses/GetHtmlResponse';
import { IHttpClient } from './contracts/IHttpClient';

@injectable()
export default class CustomHttpClient implements IHttpClient {
    private _baseUrl:string = `http://${process.env.SIMPLE_HTTP_CLIENT_HOSTNAME ?? ''}:${process.env.SIMPLE_HTTP_CLIENT_PORT}/api`;

    public async getHtml(command: GetHtmlCommand): Promise<GetHtmlResponse> {
        console.log(`Fetching HTML from URL: ${this._baseUrl}`);
        const response = await fetch(`${this._baseUrl}/http-client`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: command.url,
                useCache: command.useCache ?? false,
                useBasicHttpClient: command.useBasicHttpClient ?? false,
            } as GetHtmlCommand),
        });
        if (!response.ok) {
            throw new Error(`Failed to get HTML from the URL : ${command}`);
        }
        const json = await response.json();
        console.log(`HTML fetched successfully from ${command.url}`);
        return json as Promise<GetHtmlResponse>;
    }
}