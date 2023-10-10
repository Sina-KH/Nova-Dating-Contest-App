import IntroScreen from '@/screens/intro/IntroScreen';
import type { NextPage } from 'next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

const IntroPage: NextPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>Nova Dating App</title>
            </Head>
            <IntroScreen />
        </>
    );
};

export default IntroPage;
