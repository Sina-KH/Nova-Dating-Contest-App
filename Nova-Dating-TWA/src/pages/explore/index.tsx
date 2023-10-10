import type { NextPage } from 'next';
import Head from 'next/head';
import ExploreScreen from '@/screens/explore/ExploreScreen';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ExplorePage: NextPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('explore.title')}</title>
            </Head>
            <ExploreScreen />
        </>
    );
};

export default ExplorePage;
