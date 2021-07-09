import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import path from 'path';

import logging from './modules/logging'

const app = express();
const server = http.createServer(app);
const io: socketio.Server = new socketio.default(server);

app
    .use(express.static(path.resolve('screen/out')))
    .use(logging())

io.on('connection', (socket: any) => {
    const { id } = socket.client;
    console.log(`User connected: ${id}`);
});

app.listen(3000, () => {
	console.log('SERVER RUN IN PORT 3000');
});