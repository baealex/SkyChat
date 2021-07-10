import Head from 'next/head'
import { useRouter } from 'next/router'
import {
    useCallback,
    useState,
} from 'react'

import roomState from '@state/room'

export default function Home() {
    const router = useRouter()
    const [ room, setRoom ] = useState('');
    
    const handleClick = useCallback(() => {
        roomState.setState({
            room,
        })
        router.push('/room')
    }, [])

    return (
        <>
            <Head>
                <title>Flowing</title>
            </Head>

            <div>
                <p>
                    asdasdasd
                </p>
                <input onChange={(e) => setRoom(e.target.value)}/>
                <button onClick={handleClick}>
                    Enter the room
                </button>
            </div>
        </>
    )
}