import { State } from './global'

interface RoomState {
    room: string;
}

class Room extends State<RoomState> {
    constructor() {
        super();

        this.state = {
            room: '',
        }
    }
}

export const roomState = new Room()