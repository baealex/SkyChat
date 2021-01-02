import express from 'express';
import * as views from './views.js';
import http from 'http';
import path from 'path';

const app = express();

app.use(express.static(path.resolve('./src/static')));

app.get('/', views.renderChatList);
app.get('/chat/:id', views.renderChat);

export default http.Server(app);