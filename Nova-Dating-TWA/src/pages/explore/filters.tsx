import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchFiltersScreen from '@/screens/explore/SearchFiltersScreen';

const FiltersPage: NextPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('explore.filters.title')}</title>
            </Head>
            <SearchFiltersScreen />
        </>
    );
};

export default FiltersPage;
