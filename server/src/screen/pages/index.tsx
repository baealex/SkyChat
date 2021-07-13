import Head from 'next/head'
import { useRouter } from 'next/router'
import {
    useCallback,
    useRef,
    useState,
} from 'react'

import roomState from '@state/room'

export default function Home() {
    const router = useRouter()

    const input = useRef<HTMLInputElement>(null)
    
    const [ roomName, setRoomName ] = useState('')
    
    const handleClick = useCallback(() => {
        roomState.setState({
            room: roomName,
        }).then(() => {
            router.push('/room')
        })
    }, [roomName])

    return (
        <>
            <Head>
                <title>Flowing</title>
            </Head>

            <div>
                <div className="input-group">
                    <input
                        ref={input}
                        value={roomName}
                        placeholder="Input the room name"
                        onChange={(e) => setRoomName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleClick()}
                    />
                    <button className={roomName && 'show'} onClick={handleClick}>
                        Enter
                    </button>
                </div>
                <img className="bottom-corner" src="/assets/logo.png" />
            </div>
            <style jsx>{`
                .bottom-corner {
                    position: absolute;
                    right: 15px;
                    bottom: 15px;
                    width: 350px;
                }

                .input-group {
                    margin-top: 1rem;
                    display: flex;
                    justify-content: space-between;
                    background: #fff;
                    box-shadow: 0 2px 16px 0 hsla(0, 0%, 0%, 0.1);
                    border-radius: 100px;
                    padding: 8px 8px 8px 16px;

                    input {
                        flex: 1;
                        border: none;
                        outline: none;
                    }

                    button {
                        transition: opacity 0.5s;
                        background-color: rgb(255, 212, 96);
                        padding: 8px 16px;
                        border-radius: 100px;
                        opacity: 0;
                        border: none;
                        outline: none;

                        &.show {
                            opacity: 1;
                        }
                    }
                }
            `}</style>
        </>
    )
}