import type { NextPage } from 'next';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import React from 'react';

const ProfilePage: NextPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('profile.title')}</title>
            </Head>
            <ProfileScreen />
        </>
    );
};

export default ProfilePage;
