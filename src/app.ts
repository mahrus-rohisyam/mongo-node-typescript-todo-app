require('dotenv').config()
import { Router as ExpressRouter} from "express";
import Connection from "./delivery/http/Connection";
import Handler from "./delivery/http/Handler";
import Router from "./delivery/http/Router";
import Server from "./delivery/http/Server";

const connection: Connection = new Connection(String(process.env.DB_URL))
const router: ExpressRouter = Router(Handler(connection.connect))
const server: Server = new Server(router)

server.run(Number(process.env.PORT))