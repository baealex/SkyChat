var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/client/list.html');
});

app.get('/chat', (req,res) => {
	res.sendFile(__dirname + '/views/client/chat.html');
});

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'baealex',
	password: '1234',
	port: 3306,
	database: 'testcase'
});

connection.connect();

insertChat = (name, chat) => {
	connection.query('INSERT INTO CHAT(USER, CONTENT) VALUES(\''+name+'\',\''+chat+'\');', (err, rows, filds) => {
		if(err)
			console.log(err);
	});
};

getChatHistory = (num) => {
	connection.query('SELECT PK, USER, CONTENT FROM CHAT ORDER BY PK DESC LIMIT ' + num + ';', (err, rows, filds)=> {
		if(!err) {
			return rows;
		}
		else
			console.log(err);
	});
};

io.on('connection', socket => {
	var randomNick = ['감자탕', '조개탕', '온탕', '냉탕', '맛탕', '새우탕', '그라탕', '갈비탕', '백설탕', '쌍화탕', '탕탕탕'];
	console.log('USER CONNECTED : ', socket.id);

    connection.query('SELECT PK, USER, CONTENT FROM CHAT ORDER BY PK DESC LIMIT 10;', (err, rows, filds)=> {
		if(!err) for(let i=rows.length-1; i>=0; i--) io.to(socket.id).emit('receive message', rows[i].USER, rows[i].CONTENT);
		else console.log(err);
	});

	socket.on('start', (name) => {
		if(!name) {
			userName = randomNick[Math.floor(Math.random()*randomNick.length)];
		} else {
			userName = name;
		}
		notice = userName + '님이 입장했습니다.';
		console.log(socket.id + '(' + name + ')');
		insertChat('시스템', notice);
		io.to(socket.id).emit('change name', userName);
		io.emit('receive message', '시스템', notice);
	});

	socket.on('disconnect', () => {
		console.log('USER DISCONNECT : ', socket.id);
	});

	socket.on('send message', (name, text) => {
		console.log(socket.id + '(' + name + ') : ' + text);
		io.emit('receive message', name, text);
		insertChat(name, text);
	});
});

http.listen(3000, () => {
	console.log('SERVER RUN IN PORT 3000');
});
