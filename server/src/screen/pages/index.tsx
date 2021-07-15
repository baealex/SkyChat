import { useRouter } from 'next/router'
import {
    useCallback,
    useState,
} from 'react'

import {
    Logo,
    RoomInput,
} from '@components/page-index';

import { roomState } from '@state/room'

export default function Home() {
    const router = useRouter()
    
    const [ roomName, setRoomName ] = useState('')
    
    const handleClick = useCallback(() => {
        roomState.setState({
            room: roomName,
        }).then(() => router.push('/room'))
    }, [roomName])

    return (
        <>
            <RoomInput
                value={roomName}
                placeholder="Input the room name"
                onChange={(e) => setRoomName(e.target.value)}
                buttonText="Enter"
                onClick={handleClick}
            />
            <Logo position="bottom-left"/>
        </>
    )
}