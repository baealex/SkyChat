import Head from 'next/head'
import {
    useEffect,
    useState
} from 'react'

import io from 'socket.io-client';

const socket = io();

interface Rooms {
    [key: string]: number;
}

export default function Home() {
    const [ rooms, setRooms ] = useState<Rooms>({});

    useEffect(() => {
        console.log('xxx')
        socket.emit('show-room');
        socket.on('show-room', (data: Rooms) => {
            console.log('yyy')
            setRooms(data);
        })
    }, [])

    console.log(rooms);

    return (
        <>
            <Head>
                <title>Flowing</title>
                <script src="/socket.io/socket.io.js"/>
            </Head>

            <div>
                <p>
                    asdasdasd
                </p>
            </div>
        </>
    )
}