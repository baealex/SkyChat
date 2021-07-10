import Head from 'next/head'
import { useEffect } from 'react'

import socket from '@modules/socket'

export default function Home() {
    useEffect(() => {
        socket.emit('hello')
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
            </div>
        </>
    )
}