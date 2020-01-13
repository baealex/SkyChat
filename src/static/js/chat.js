var socket = io();

var roomName = location.pathname.split('/')[2];
var isHost = false;

socket.on('receive message' + roomName, function(name, text) {
	socket.emit('host save', name, text);
	var tagP = document.createElement('p');
	var msg = name + ' : ' + text;
	if(name == $('#name').val()) {
		tagP.className = 'myMessage';
		msg = text;
	}
	tagP.appendChild(document.createTextNode(msg))
	document.getElementById('chatLog').appendChild(tagP);
	document.getElementById('chatLog').scrollTop = document.getElementById('chatLog').scrollHeight;
});

socket.on('host user', function(isHost) {
	isHost = isHost;
});

socket.on('change name', function(name) {
	$('#name').val(name);
});

socket.on(`${roomName} host out`, function() {
	alert('호스트님이 퇴장하셨습니다.');
	location.href = '/';
});

function start() {
	socket.emit('start', roomName, $('#name').val());
	document.getElementById('first').style.display = "none";
	document.getElementById('chatBox').style.position = "fixed";
}

function chat() {
	var name = $('#name').val();
	var text = $('#message').val();

	if(text.length !== 0) {
		socket.emit('send message', name, text);
		$('#message').val('');
		$('#message').focus();
	}
}

function checkEnter() {
	if(event.keyCode == 13) {
		chat();
		$('#message').val('');
	}
}