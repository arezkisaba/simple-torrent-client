import 'reflect-metadata';
import app from './app';

const appPort = process.env.APP_PORT;
const simpleHttpClientHostname = process.env.SIMPLE_HTTP_CLIENT_HOSTNAME;
const simpleHttpClientPort = process.env.SIMPLE_HTTP_CLIENT_PORT;
const volumeContainerDownloadPath = process.env.VOLUME_CONTAINER_DOWNLOAD_PATH;
const volumeHostDownloadPath = process.env.VOLUME_HOST_DOWNLOAD_PATH;

app.listen(appPort, () => {
    console.log(`appPort: ${appPort}`);
    console.log(`simpleHttpClientHostname: ${simpleHttpClientHostname}`);
    console.log(`simpleHttpClientPort: ${simpleHttpClientPort}`);
    console.log(`volumeContainerDownloadPath: ${volumeContainerDownloadPath}`);
    console.log(`volumeHostDownloadPath: ${volumeHostDownloadPath}`);
    console.log(`Server is running on port ${appPort}`);
});
