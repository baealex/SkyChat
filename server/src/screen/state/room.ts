import { State } from './global'

class RoomState extends State {
    constructor() {
        super();

        this.state = {
            room: '',
        }
    }
}

export default new RoomState()