import { Socket } from 'socket.io'

interface ClientSocket extends Socket {
    username: string;
}

interface RoomClients {
    [key: string]: ClientSocket[];
}

let waitClients: ClientSocket[] = [];
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

export default function(socket: ClientSocket) {
    const { id } = socket;
    console.log(`USER CONNECTED : ${id}`);

    socket.on('show-room', () => {
        console.log('xxxx');
        waitClients.push(socket);
        socket.emit('show-room', getRoomsInfo());
    });

    socket.on('chat-start', (room, username) => {
        waitClients = waitClients.filter(client => client.id != id);

        if(!roomClients[room]) {
            roomClients[room] = [];
        }
        
        const isExist = roomClients[room].filter(client => client.username == username).length > 0 ? true : false;
        if(isExist) {
            socket.emit('exist-username');
            return;
        }

        socket.username = username;
        roomClients[room].push(socket);
        console.log(`USER CONNECTED : '${id}' in '${room}' as '${username}'`);
        updateRoomsInfo();

        socket.emit('client-hello');
        roomEmit(room, `receive-message`, '시스템', `${username}님이 입장했습니다.`);

        socket.on('send-message', (username, text) => {
            roomEmit(room, `receive-message`, username, text);
        });
    
        socket.on('disconnect', () => {
            roomEmit(room, `receive-message`, '시스템', `${username}님이 퇴장했습니다.`);
            
            waitClients = waitClients.filter(client => client.id != id);
            roomClients[room] = roomClients[room].filter(client => client.username != username)
            if(roomClients[room].length == 0) {
                delete roomClients[room];
            }
            console.log(`USER DISCONNECTED : '${id}' in '${room}' as '${username}'`);
            updateRoomsInfo();
        });
    });
}