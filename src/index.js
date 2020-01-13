var app  = require('./urls');
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var db   = require('./db');
var cfn  = require('./commonfn');

io.on('connection', (socket) => {
	var randomNick = ['감자탕', '조개탕', '온탕', '냉탕', '맛탕', '새우탕', '그라탕', '갈비탕', '백설탕', '쌍화탕', '탕탕탕'];
	var username = '';
	var connect = false;
	var isHost = false;
	var roomName = '';
	var data = {};

	socket.on('host save', (name, text) => {
		if(isHost) {
			db.dataPush(roomName, data, name, text);
		}
	});
	
	socket.on('start', (room, username) => {
		connect = true;
		roomName = room;
		
		isHost = db.isHost(roomName);
		if(isHost) {
			io.to(socket.id).emit('host user', isHost);
			db.dataInit(roomName, socket.id);
		}
		data = db.dataLoad(roomName);

		if(cfn.nickCheck(username, data.userContent)) {
			this.username = username;
		} else {
			this.username = randomNick[Math.floor(Math.random()*randomNick.length)];
		}

		data.userContent.forEach((element) => {
			io.to(socket.id).emit(`receive message${roomName}`, element.name , element.text);
		});

		io.to(socket.id).emit('change name', this.username);
		io.emit(`receive message${roomName}`, '시스템', `${this.username}님이 입장했습니다.`);

		console.log('USER CONNECTED : ' + socket.id + '(' + this.username + ',' + roomName + ')');
	});

	socket.on('disconnect', () => {
		if(connect) {
			if(isHost) {
				db.dataRemove(roomName);
				io.emit(`${roomName} host out`);
			} else {
				io.emit(`receive message${roomName}`, '시스템', `${this.username}님이 퇴장했습니다.`);
			}
			console.log('USER DISCONNECT : ' + socket.id + '(' + this.username + ',' + roomName + ')');
		}
	});

	socket.on('send message', (name, text) => {
		io.emit(`receive message${roomName}`, name, text);
		console.log(socket.id + '(' + this.username + ',' + roomName + ') : ' + text);
	});
});

http.listen(3000, () => {
	console.log('SERVER RUN IN PORT 3000');
});