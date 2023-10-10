import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MatchesScreen from '@/screens/matches/MatchesScreen';

const MatchesPage: NextPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('matches.title')}</title>
            </Head>
            <MatchesScreen />
        </>
    );
};

export default MatchesPage;
