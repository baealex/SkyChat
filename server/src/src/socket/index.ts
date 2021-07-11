import { Server, Socket } from 'socket.io'

interface Profile {
    id: number;
    name: string;
    image: string;
}

interface User {
    socket: Socket,
    profile: Profile
}

interface Message {
    profile: Profile,
    text: string;
}

const profiles: Profile[] = [
    {id: 1, name: '익명의 아스파라거스', image: 'ASPARAGUS'},
    {id: 2, name: '익명의 비트', image: 'BEETROOT'},
    {id: 3, name: '익명의 브로콜리', image: 'BROCCOLI'},
    {id: 4, name: '익명의 버터넛', image: 'BUTTERNUT'},
    {id: 5, name: '익명의 칠리', image: 'CHILLI'},
    {id: 6, name: '익명의 옥수수', image: 'CORN'},
    {id: 7, name: '익명의 주키니호박', image: 'COURGETTE'},
    {id: 8, name: '익명의 파', image: 'LEEK'},
    {id: 9, name: '익명의 어니언', image: 'ONION'},
    {id: 10, name: '익명의 콩', image: 'PEAS'},
    {id: 11, name: '익명의 페퍼', image: 'PEPPER'},
    {id: 12, name: '익명의 펌킨', image: 'PUMPKIN'},
]

const roomsMap = new Map<string, User[]>()

function randint(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export default function socketManager(io: Server) {
    io.on('connection', (socket) => {
        const { id } = socket;
        console.log(`USER CONNECTED : ${id}`)

        socket.on('enter-the-room', (room) => {
            const roomUsers = roomsMap.get(room) || []
            const usernames = roomUsers.map(roomUser => roomUser.profile.name)

            if (usernames.length >= profiles.length) {
                socket.emit('room-is-full')
                return;
            }
            
            let userProfile: Profile;
            while (true) {
                const randNumber = randint(0, profiles.length)
                userProfile = profiles[randNumber]
                if (!usernames.includes(userProfile.name)) {
                    break;
                }
            }
            socket.emit('assign-username', userProfile)
            const user: User = {
                socket: socket,
                profile: userProfile,
            }

            roomUsers.push(user)
            roomsMap.set(room, roomUsers)

            socket.on('send-message', (text: string) => {
                const users = roomsMap.get(room) || []
                users.forEach(roomMember => {
                    roomMember.socket.emit('send-message', {
                        profile: user.profile,
                        text: text,
                    })
                })
            })

            socket.on('disconnect', () => {
                const roomUsers = roomsMap.get(room) || []
                roomsMap.set(room, roomUsers.filter(roomUser =>
                    roomUser.profile.name != user.profile.name))
                console.log(`USER DISCONNETED : ${id}`)
            })
        })
    })
}