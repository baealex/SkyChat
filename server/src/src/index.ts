import app from './app';
import socketEvent from './socket';

require("socket.io")(app).on('connection', socketEvent);

app.listen(3000, () => {
	console.log('SERVER RUN IN PORT 3000');
});