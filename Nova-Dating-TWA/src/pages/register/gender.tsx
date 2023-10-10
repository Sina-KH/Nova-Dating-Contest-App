import RegisterGenderScreen from '@/screens/register/RegisterGenderScreen';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import React from 'react';

export default function RegisterPage() {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('register.gender.title')}</title>
            </Head>
            <RegisterGenderScreen />
        </>
    );
}
