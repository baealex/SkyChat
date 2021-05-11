var socket = io();

var room = location.pathname.split('/')[2];

function sendMessage() {
    var username = select('#name').val();
    var text = select('#message').val();

    if(text.length !== 0) {
        socket.emit('send-message', username, text);
        select('#message').val('');
        select('#message').focus();
    }
}

select('#chatBarrier button').on('click', function(event) {
    socket.emit('chat-start', room, select('#name').val());
});

select('#message').on('keydown', function(event) {
    if(event.keyCode == 13) {
        sendMessage();
    }
});

socket.on('exist-username', function() {
    alert('이미 존재하는 닉네임입니다.');
});

socket.on('client-hello', function() {
    select('#chatBarrier').direct().style.display = "none";
    select('#chatBox').direct().style.position = "fixed";
});

socket.on('receive-message', function(username, text) {
    var isMine = username == select('#name').val();
    var chatLog = select('#chatLog');
    chatLog.append(`
        <p${isMine ? ' class="my"' : ''}>
            ${isMine ? '' : username + ' : '}${text}
        </p>
    `);
    chatLog.direct().scrollTop = chatLog.direct().scrollHeight;
});

socket.on('change name', function(name) {
    select('#name').val(name);
});