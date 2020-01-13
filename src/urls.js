var express = require('express');
var views   = require('./views');

var app = express();

app.get('/',         views.chatList);
app.get('/chat/:id', views.chatRoom);

app.use(express.static(__dirname + '/static'));

module.exports = app;