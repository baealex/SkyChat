import Head from 'next/head'
import { useRouter } from 'next/router'
import {
    useEffect,
    useState,
} from 'react'

import socket from '@modules/socket'
import roomState from '@state/room'

interface Profile {
    id: number;
    name: string;
    image: string;
}

interface Message {
    profile: Profile,
    text: string;
}

export default function Home() {
    const router = useRouter()

    const [ profile, setProfile ] = useState<Profile | null>(null)
    const [ messages, setMessages ] = useState<Message[]>([])
    const [ text, setText ] = useState('')

    useEffect(() => {
        alert(roomState.state.room)
        if (!roomState.state.room) {
            router.push('/')
        }
        socket.emit('enter-the-room', roomState.state.room)

        socket.on('assign-username', (profile: Profile) => {
            setProfile(profile)
        })
        socket.on('room-is-full', () => {
            router.push('/')
        })

        socket.on('send-message', (message: Message) => {
            setMessages((prevMessages) => prevMessages.concat(message))
        })

        return () => {
            socket.off('assign-username')
            socket.off('room-is-full')
            socket.off('send-message')
        }
    }, [])

    const handleClick = () => {
        socket.emit('send-message', text)
    }
    
    return (
        <>
            <Head>
                <title>Flowing</title>
            </Head>

            <div>
                <img src={`/assets/profile/${profile?.image}.png`} />
                <p>
                    {profile?.name}
                </p>
                {messages?.map(message => (
                    <p>{message.profile.name} {message.text}</p>
                ))}
                <input onChange={(e) => setText(e.target.value)}/>
                <button onClick={handleClick}>
                    send message
                </button>
            </div>
        </>
    )
}