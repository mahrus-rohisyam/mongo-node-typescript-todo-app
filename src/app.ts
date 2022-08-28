import { Router as ExpressRouter } from 'express';
import Config from './config/Config';
import Connection from './config/Connection';
import Handler from './config/Handler';
import Router from './config/Router';
import Server from './config/Server';

const connection: Connection = new Connection(String(Config.database.url));
const router: ExpressRouter = Router(Handler(connection.connect));
const server: Server = new Server(router);

const app = server.run(Number(Config.port));

export default app
