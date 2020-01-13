var db = require('./db')

module.exports = {
    chatList: (req, res) => {
        res.sendFile(__dirname + '/templates/list.html');
    },
    chatRoom: (req, res) => {
        res.sendFile(__dirname + '/templates/chat.html');
    },
}