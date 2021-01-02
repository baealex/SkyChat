import app from './app.js';
import SocketIO from 'socket.io';
import socketEvent from './socket.js';

SocketIO(app).on('connection', socketEvent);

app.listen(3000, () => {
	console.log('SERVER RUN IN PORT 3000');
});