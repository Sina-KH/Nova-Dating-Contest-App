import RegisterInterestsScreen from '@/screens/register/RegisterInterestsScreen';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import React from 'react';

export default function InterestsPage() {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('register.interests.title')}</title>
            </Head>
            <RegisterInterestsScreen />
        </>
    );
}
