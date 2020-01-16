var db = require('./db')

module.exports = {
    renderChatList: (req, res) => {
        res.sendFile(__dirname + '/templates/list.html');
    },
    renderChat: (req, res) => {
        res.sendFile(__dirname + '/templates/chat.html');
    },
    chatList: (req, res) => {
        rooms = db.roomList();
        res.json({
            rooms: rooms,
        });
    },
}