import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Head from 'next/head';
import MySessionProvider, { useSession } from '@/contexts/useSession';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LocalizationResources from '@/helpers/localizationResources';
import { useRouter } from 'next/router';
import MyAppContent from '@/components/Containers/MyAppContainer';
import MySocketProvider from '@/contexts/useSocket';

i18n.use(initReactI18next)
    .init({
        resources: LocalizationResources,
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false
        }
    })
    .then();

function MyApp(props: AppProps) {
    const router = useRouter();

    useEffect(() => {
        // expand the app on launch
        window.Telegram?.WebApp?.expand();

        // @ts-ignore
        window.Telegram?.WebApp?.onEvent('backButtonClicked', () => {
            router.back();
        });

        // handle back button changes
        const handleRouteChange = (url: string) => {
            if (url.startsWith('/register') || url.split('/').filter((it) => it.length).length > 1)
                // @ts-ignore
                window.Telegram?.WebApp?.BackButton?.show();
            // @ts-ignore
            else window.Telegram?.WebApp?.BackButton?.hide();
        };

        // Add the event listener for route changes
        router.events.on('routeChangeStart', handleRouteChange);

        // Remove the event listener when the component unmounts
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MySessionProvider>
                <MySocketProvider>
                    <MyAppContent {...props} />
                </MySocketProvider>
            </MySessionProvider>
        </>
    );
}

export default MyApp;
