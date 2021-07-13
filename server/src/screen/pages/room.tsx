import { useRouter } from 'next/router'
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'

import socket from '@modules/socket'
import roomState from '@state/room'
import { Card } from '@components/atoms'

interface Profile {
    id: number;
    name: string;
    image: string;
}

interface Message {
    profile?: Profile;
    text: string;
}

export default function Home() {
    const router = useRouter()

    const input = useRef<HTMLInputElement>(null)

    const [ _, setProfile ] = useState<Profile | null>()
    const [ messages, setMessages ] = useState<Message[]>([])
    const [ text, setText ] = useState('')

    useEffect(() => {
        if (!roomState.state.room) {
            router.push('/')
            return;
        }

        socket.emit('enter-the-room', roomState.state.room)
        socket.once('room-is-full', () => {
            router.push('/')
            return
        })
        socket.once('assign-username', (profile: Profile) => {
            setProfile(profile)
        })
        socket.on('send-message', (message: Message) => {
            setMessages((prevMessages) => prevMessages.concat(message))
            window.scrollTo(0, document.body.scrollHeight)
        })
        
        return () => {
            socket.emit('exit-the-room')
        }
    }, [])

    const handleClick = useCallback(() => {
        input.current?.focus()
        if (!text) {
            return
        }
        socket.emit('send-message', text)
        setText('')
    }, [text])
    
    return (
        <>
            <div className="chat-box">
                {messages.map(message => (
                    <div className="history mt-3">
                        {message.profile ? (
                            <>
                                <div className="profile">
                                    <img src={`/assets/profile/${message.profile.image}.png`} />
                                </div>
                                <div className="text">
                                    <p className="username">{message.profile.name}</p>
                                    <Card isRounded className="p-3">
                                        <p>{message.text}</p>
                                    </Card>
                                </div>
                            </>
                        ) : (
                            <Card isRounded className="p-3">
                                <p>{message.text}</p>
                            </Card>
                        )}
                    </div>
                ))}
            </div>
            <div className="bottom-box">
                <div className="container">
                    <div className="input-box">
                        <input
                            ref={input}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleClick()}
                        />
                        <button className="send" onClick={handleClick}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .chat-box {
                    padding-bottom: 60px;
                    margin: 1rem 0;

                    .history {
                        display: flex;

                        .profile {
                            margin-right: 8px;

                            img {
                                box-shadow: 0 2px 16px 0 hsla(0, 0%, 0%, 0.1);
                                border-radius: 100%;
                                background: #fff;
                                width: 50px;
                                heigth: 50px;   
                            }
                        }

                        .text {
                            .username {
                                margin-bottom: 4px;
                            }

                            flex: 1;
                            word-break: break-all;
                        }
                    }
                }

                .bottom-box {
                    background-color: rgba(255, 255, 255, 0.35);
                    border-top: 1px solid #eee;
                    backdrop-filter: blur(5px);
                    position: fixed;
                    bottom: 0px;
                    left: 0px;
                    height: 60px;
                    width: 100%;
                }

                .input-box {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    * {
                        border-radius: 100px;
                        padding: 12px 24px;
                        outline: none;
                        border: none;
                    }

                    .send {
                        background-color: #FFD460;
                    }

                    input {
                        margin-right: 8px;
                        flex: 1;
                    }
                }
            `}</style>
        </>
    )
}