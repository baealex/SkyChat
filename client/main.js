var socket = io();

socket.on('receive message', function(n, m) {
	var tagP = document.createElement('p');
	var msg = n + ' : ' + m;
	if(n == $('#name').val()) {
		tagP.className = 'myMessage';
		msg = m;
	}
	tagP.appendChild(document.createTextNode(msg))
	document.getElementById('chatLog').appendChild(tagP);
	document.getElementById('chatLog').scrollTop = document.getElementById('chatLog').scrollHeight;
});

socket.on('change name', function(name) {
	$('#name').val(name);
});

function start() {
	socket.emit('start', $('#name').val());
	document.getElementById('first').style.display = "none";
	document.getElementById('chatBox').style.position = "fixed";
	e.preventDefault();
}

function chat() {
	socket.emit('send message', $('#name').val(), $('#message').val());
	$('#message').val('');
	$('#message').focus();
	e.preventDefault();
}

function checkEnter() {
	if(event.keyCode == 13) {
		chat();
		$('#message').val('');
	}
}
