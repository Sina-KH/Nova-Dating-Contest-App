import type { NextPage } from 'next';
import EditProfileScreen from '@/screens/profile/EditProfileScreen';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import React from 'react';

const ProfileEditPage: NextPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('profile.edit.title')}</title>
            </Head>
            <EditProfileScreen />
        </>
    );
};

export default ProfileEditPage;
