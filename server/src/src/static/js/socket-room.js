var socket = io();

socket.emit('show-room');

socket.on('show-room', function(data) {
    let result = '';
    for(const room in data) {
        result += `<li><a href="/chat/${room}">${room} (${data[room]})</a></li>`
    }
    select('.room-list').html(result);
});

function enterOrCreate() {
	var inputRoom = select('#inputRoom').val();
	if(inputRoom.length != 0) {
		location.href = '/chat/' + inputRoom;
	}
}

select('#inputRoom').on('keydown', function(event) {
    if(event.keyCode == 13) {
        enterOrCreate();
    }
});