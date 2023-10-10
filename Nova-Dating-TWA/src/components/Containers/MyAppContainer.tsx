import { AppProps } from 'next/app';
import { useSession } from '@/contexts/useSession';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IUserStatus } from '@/types/IUser';
import clsx from 'clsx';
import MainContainer from '@/components/Containers/MainContainer';
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useSocket } from '@/contexts/useSocket';

// bottom navigation, theme related stuff and redirects are handled here.
export default function MyAppContent({ Component, pageProps }: AppProps) {
    const { sessionToken, user } = useSession();
    const { socket } = useSocket();
    const [isDark, setIsDark] = useState(false);
    const dataLoaded = sessionToken?.length && !!user;

    const router = useRouter();

    // listen for new match on socket
    const [matchBadge, setMatchBadge] = useState(false);

    useEffect(() => {
        const isDark = window.Telegram.WebApp.colorScheme === 'dark';
        // check if theme is dark. we switch secondary bg and primary bg on dark scheme
        setIsDark(isDark);
        // @ts-ignore
        window.Telegram?.WebApp?.setHeaderColor(isDark ? 'secondary_bg_color' : 'bg_color');
        // @ts-ignore
        window.Telegram?.WebApp?.setBackgroundColor(isDark ? 'secondary_bg_color' : 'bg_color');
    }, []);

    // listen for match event
    useEffect(() => {
        socket?.off('match');
        socket?.on('match', (data) => {
            // set badge if page is not `/matches`
            if (data.match) {
                if (router.pathname !== '/matches') {
                    setMatchBadge(true);
                }
            }
        });
        return () => {
            socket?.off('match');
        };
    }, [router.pathname, socket]);

    // callback on init data validation using back-end service
    useEffect(() => {
        // check if app should redirect user to home or register
        if (!dataLoaded) return;
        // check if we should redirect user to home
        if (
            user?.status !== IUserStatus.preRegistered &&
            (router.pathname === '/' || router.pathname.startsWith('/register'))
        ) {
            let homePath = '/explore';
            router
                .push(
                    {
                        pathname: homePath
                    },
                    homePath,
                    { shallow: true }
                )
                .then();
            return;
        }
        // check if we should redirect user to register
        const shouldRedirectToRegister =
            // user not registered completely
            user.status === IUserStatus.preRegistered &&
            // not in intro
            router.pathname !== '/' &&
            // not in register, already!
            !router.pathname.startsWith('/register');
        if (shouldRedirectToRegister) {
            let registerPath = '/register';
            router
                .push(
                    {
                        pathname: registerPath
                    },
                    registerPath,
                    { shallow: true }
                )
                .then();
            return;
        }
    }, [sessionToken]);

    // empty if loading data
    if (!dataLoaded || (router.pathname === '/' && user?.status !== IUserStatus.preRegistered)) return <></>; // is loading or will be redirected

    // remove match badge on opening match page
    if (matchBadge && router.pathname === '/matches') setMatchBadge(false);

    const showBottomNavigation = !!user && user.status !== IUserStatus.preRegistered;
    return (
        <div className={clsx('bg-telegram-bg flex flex-col h-screen', isDark ? 'color-scheme-dark' : '')}>
            <AnimatePresence mode={'wait'}>
                <motion.div
                    key={router.route}
                    initial="pageInitial"
                    animate="pageAnimate"
                    exit="pageExit"
                    variants={{
                        pageInitial: {
                            opacity: 0,
                            width: '100%',
                            height: '100%',
                            marginLeft: '30px'
                        },
                        pageAnimate: {
                            opacity: 1,
                            marginLeft: '0px'
                        },
                        pageExit: {
                            opacity: 0,
                            width: '100%',
                            height: '100%',
                            marginLeft: '-30px'
                        }
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <MainContainer>
                        <Component {...pageProps} />
                    </MainContainer>
                </motion.div>
            </AnimatePresence>
            <BottomNavigation
                className={clsx(
                    showBottomNavigation ? 'opacity-100' : 'opacity-0 pointer-events-none',
                    'transition-opacity duration-1000'
                )}
                disabled={!showBottomNavigation}
                matchBadge={matchBadge}
            />
        </div>
    );
}
