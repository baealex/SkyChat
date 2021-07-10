import express from 'express'
import path from 'path';
import socketio from 'socket.io'

import logging from './modules/logging'
import socketController from './socket'

const app = express()
    .use(logging())
    .use(express.static(path.resolve('screen/out')))
    .listen(3000, () => console.log('listen on :3000'))

const io = new socketio.Server(app)
io.on('connection', socketController)