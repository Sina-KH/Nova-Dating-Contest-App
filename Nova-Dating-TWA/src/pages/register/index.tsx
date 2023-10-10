import RegisterProfileScreen from '@/screens/register/RegisterProfileScreen';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import React from 'react';

export default function RegisterPage() {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('register.profile.title')}</title>
            </Head>
            <RegisterProfileScreen />
        </>
    );
}
