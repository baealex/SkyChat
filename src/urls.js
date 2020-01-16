var express = require('express');
var views   = require('./views');

var app = express();

app.get('/',         views.renderChatList );
app.get('/chat',     views.chatList       );
app.get('/chat/:id', views.renderChat     );

app.use(express.static(__dirname + '/static'));

module.exports = app;