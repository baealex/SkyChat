import path from 'path';

const __dirname = path.resolve();
const roomList = [];

export function renderChatList(req, res) {
    res.sendFile(__dirname + '/src/templates/room.html');
}

export function renderChat(req, res) {
    if(!roomList.includes(req.params.id)) {
        roomList.push(req.params.id);
    }
    res.sendFile(__dirname + '/src/templates/chat.html');
}