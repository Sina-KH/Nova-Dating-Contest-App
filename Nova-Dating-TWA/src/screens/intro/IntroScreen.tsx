import { useTranslation } from 'react-i18next';
import MyButton from '@/components/Button/MyButton';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MyTitle from '@/components/Label/MyTitle';
import MySubTitle from '@/components/Label/MySubTitle';
import { LogoIcon } from '@/assets/logoIcon';
import MyGrowingContainer from '@/components/Containers/MyGrowingContainer';

export default function RegisterInterestsScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger animation after a delay (e.g., 1 second)
        const animationTimeout = setTimeout(() => {
            setAnimate(true);
        }, 0);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(animationTimeout);
    }, []);

    return (
        <div className={'w-full h-full pt-8 pb-8 flex flex-col items-center space-y-4'}>
            <LogoIcon />
            <div className={'flex flex-col items-center pl-4 pr-4'}>
                <MyTitle>{t('intro.title')}</MyTitle>
                <MySubTitle>{t('intro.subtitle')}</MySubTitle>
            </div>

            <MyGrowingContainer className={'flex flex-col items-center overflow-hidden'}>
                <div className={'inline-block relative mt-auto mb-auto'}>
                    <img
                        src={'/assets/images/intro.png'}
                        className={'h-auto'}
                        style={{
                            padding: '28px',
                            paddingLeft: '50px',
                            paddingRight: '50px'
                        }}
                    />
                    {/*Top Right Bubble*/}
                    <svg
                        width="41%"
                        viewBox="0 0 140 77"
                        fill="none"
                        className={`fill-telegram-secondary-bg absolute transition-all duration-1000`}
                        style={{ top: '2px', opacity: animate ? 1 : 0, right: animate ? '0' : '-140' }}
                    >
                        <path d="M7.74623 32.783C12.331 28.1906 18.6548 25.3396 25.6102 25.3396L36.1986 25.3396L37.939 25.3396C51.851 25.3396 63.2328 13.9366 63.2328 -2.75017e-06C63.2328 13.9366 74.6152 25.3396 88.5266 25.3396L91.4915 25.3396L114.409 25.3396C128.32 25.3396 139.703 36.742 139.703 50.6793C139.703 64.6159 128.32 76.0189 114.409 76.0189L25.6102 76.0189C11.6988 76.0189 0.316345 64.6159 0.316344 50.6793C0.316344 43.7106 3.16211 37.3754 7.74623 32.783Z" />
                    </svg>
                    {/*Left Center Bubble*/}
                    <svg
                        width="22%"
                        viewBox="0 0 77 140"
                        fill="none"
                        className={`fill-telegram-secondary-bg absolute transition-all duration-1000`}
                        style={{ top: '35%', opacity: animate ? 1 : 0, left: animate ? '0' : '-140' }}
                    >
                        <path d="M32.783 132.273C28.1906 127.688 25.3396 121.364 25.3396 114.409L25.3396 103.82L25.3396 102.08C25.3396 88.1679 13.9366 76.7862 5.50033e-06 76.7862C13.9366 76.7862 25.3396 65.4038 25.3396 51.4923L25.3396 48.5274L25.3396 25.6102C25.3396 11.6988 36.742 0.316372 50.6793 0.316374C64.6159 0.316375 76.0189 11.6988 76.0189 25.6102L76.0189 114.409C76.0189 128.32 64.6159 139.703 50.6793 139.703C43.7106 139.703 37.3754 136.857 32.783 132.273Z" />
                    </svg>
                    {/*Bottom Right Bubble*/}
                    <svg
                        width="37%"
                        viewBox="0 0 140 77"
                        fill="none"
                        className={`fill-telegram-secondary-bg absolute transition-all duration-1000`}
                        style={{ top: '64.5%', opacity: animate ? 1 : 0, right: animate ? '0' : '-140' }}
                    >
                        <path d="M7.42988 33.0994C12.0147 28.507 18.3385 25.656 25.2938 25.656L35.8823 25.656L37.6226 25.656C51.5347 25.656 62.9164 14.253 62.9164 0.316403C62.9164 14.253 74.2989 25.656 88.2103 25.656L91.1752 25.656L114.092 25.656C128.004 25.656 139.386 37.0584 139.386 50.9957C139.386 64.9323 128.004 76.3353 114.092 76.3353L25.2938 76.3353C11.3824 76.3353 -4.98443e-07 64.9323 -1.10763e-06 50.9957C-1.41224e-06 44.027 2.84577 37.6918 7.42988 33.0994Z" />
                    </svg>
                    {/*Bottom Left Bubble*/}
                    <svg
                        width="41%"
                        viewBox="0 0 140 77"
                        fill="none"
                        className={`fill-telegram-secondary-bg absolute transition-all duration-1000`}
                        style={{ top: '76%', opacity: animate ? 1 : 0, left: animate ? '0' : '-140' }}
                    >
                        <path d="M7.42988 33.0994C12.0147 28.507 18.3385 25.656 25.2938 25.656L35.8823 25.656L37.6226 25.656C51.5347 25.656 62.9164 14.253 62.9164 0.316403C62.9164 14.253 74.2989 25.656 88.2103 25.656L91.1752 25.656L114.092 25.656C128.004 25.656 139.386 37.0584 139.386 50.9957C139.386 64.9323 128.004 76.3353 114.092 76.3353L25.2938 76.3353C11.3824 76.3353 -4.98443e-07 64.9323 -1.10763e-06 50.9957C-1.41224e-06 44.027 2.84577 37.6918 7.42988 33.0994Z" />
                    </svg>
                </div>
            </MyGrowingContainer>

            <MyButton
                className={'pl-4 pr-4'}
                onClick={() => {
                    router
                        .push(
                            {
                                pathname: '/register'
                            },
                            '/register',
                            { shallow: true }
                        )
                        .then();
                }}
            >
                {t('intro.get_started')}
            </MyButton>
        </div>
    );
}
