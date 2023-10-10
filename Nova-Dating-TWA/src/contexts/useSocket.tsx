import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from '@/contexts/useSession';

const MySocketContext = createContext<{
    socket?: Socket;
}>({});

export function useSocket() {
    return useContext(MySocketContext);
}

const MySocketProvider = (props: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const { sessionToken } = useSession();

    // create socket instance
    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_URL_SOCKET) return;
        const newSocket = io(process.env.NEXT_PUBLIC_URL_SOCKET, {
            transports: ['websocket']
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    // config new socket objects to listen on connect
    useEffect(() => {
        socket?.off('connect');
        socket?.on('connect', () => {
            socket?.emit('auth', {
                token: sessionToken
            });
        });
    }, [sessionToken, socket]);

    // auth on session token change
    useEffect(() => {
        if (socket?.connected)
            socket?.emit('auth', {
                token: sessionToken
            });
    }, [sessionToken, socket]);

    return <MySocketContext.Provider value={{ socket }}>{props.children}</MySocketContext.Provider>;
};

export default MySocketProvider;
