import express, { Express, Request, Response } from "express";
import net from "net";

const app: Express = express();
const port = 8000;
const tcp_port = 8080;
const host = "127.0.0.1";
const BACKLOG = 100;

net.createServer()
	.listen(tcp_port, host, BACKLOG).on("connection", socket => socket
		.on("data", buffer => {
			const request = buffer.toString();
			console.log(`new connection from ${socket.remoteAddress}:${socket.remotePort}`);
			console.log(request);
			socket.write("hello world");
			socket.end();
		}));
// tcp_server

app.get("/", (req: Request, res: Response) => {
	return res.status(200).json();
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
