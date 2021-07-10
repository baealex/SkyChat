import { Socket } from 'socket.io'

interface ClientSocket extends Socket {
    username: string;
}

interface RoomClients {
    [key: string]: ClientSocket[];
}

let waitClients: Socket[] = [];
const roomClients: RoomClients = {};

function roomEmit(room: string, eventName: string, ...args: any[]) {
    roomClients[room].forEach(client => {
        client.emit(eventName, ...args);
    });
}

function broadcast(eventName: string, ...args: any[]) {
    for(const room in roomClients) {
        roomEmit(room, eventName, ...args);
    }
}

function getRoomsInfo() {
    const data: {[key: string]: number} = {};
    for(const room in roomClients) {
        data[room] = roomClients[room].length;
    }
    return data;
}

function updateRoomsInfo() {
    waitClients.forEach(client => {
        client.emit('show-room', getRoomsInfo());
    })
}

export default function(socket: Socket) {
    const { id } = socket;
    console.log(`USER CONNECTED : ${id}`);

    socket.on('chat-start', (room, username) => {
        socket.on('disconnect', () => {
            
        });
    });
}