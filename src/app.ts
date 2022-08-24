require('dotenv').config({path: '.development.env'})
import { Router as ExpressRouter} from "express";
import Connection from "./config/Connection";
import Handler from "./config/Handler";
import Router from "./config/Router";
import Server from "./config/Server";

const connection: Connection = new Connection(String(process.env.DB_URL))
const router: ExpressRouter = Router(Handler(connection.connect))
const server: Server = new Server(router)

server.run(Number(process.env.PORT))