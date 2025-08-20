import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import './container';
import SwaggerSpec from './features/openapi/SwaggerSpec';
import TorrentClientRoutes from './features/torrent-client/routes/TorrentClientRoutes';
import HealthcheckRoutes from './features/healthcheck/routes/HealthcheckRoutes';

const app: Application = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));
console.log('CORS enabled for all origins');

app.use(HealthcheckRoutes);
app.use(TorrentClientRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerSpec));

export default app;
