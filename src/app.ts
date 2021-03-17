import express from 'express';
import * as views from './views';
import path from 'path';

const app = express();

app.use(express.static(path.resolve('./src/static')));

app.get('/', views.renderChatList);
app.get('/chat/:id', views.renderChat);

export default require("http").Server(app);