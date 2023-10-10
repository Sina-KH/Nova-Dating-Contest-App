import React, { useContext, useEffect, useState } from 'react';
import { UserGetTokenRequest } from '@/api/requests/userGetTokenRequest';
import { IUser } from '@/types/IUser';

const MySessionContext = React.createContext<{
    sessionToken?: string;
    user?: IUser;
    setUser: (user: IUser | undefined) => void;
}>({
    setUser: () => {}
});

export function useSession() {
    return useContext(MySessionContext);
}

function MySessionProvider(props: { children: React.ReactNode }) {
    const [sessionToken, setSessionToken] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<IUser | undefined>(undefined);

    // Send data to back-end service, validate hash and receive session token
    useEffect(() => {
        let hash = window.Telegram?.WebApp?.initData;
        if (!hash && process.env.NEXT_PUBLIC_FAKE_HASH) hash = process.env.NEXT_PUBLIC_FAKE_HASH;

        new UserGetTokenRequest({ hash: hash })
            .call()
            .then((response) => {
                setSessionToken(response?.session.token ?? undefined);
                setUser(response?.user);
            })
            .catch((e) => {});
    }, []);

    return (
        <MySessionContext.Provider value={{ sessionToken, user, setUser }}>{props.children}</MySessionContext.Provider>
    );
}

export default MySessionProvider;
