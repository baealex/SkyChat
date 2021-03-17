import path from 'path';

import { Request, Response } from 'express';

const __dirname = path.resolve();
const roomList: string[] = [];

export function renderChatList(req: Request, res: Response) {
    res.sendFile(__dirname + '/src/templates/room.html');
}

export function renderChat(req: Request, res: Response) {
    if(!roomList.includes(req.params.id)) {
        roomList.push(req.params.id);
    }
    res.sendFile(__dirname + '/src/templates/chat.html');
}