import { BottomNavigationTab } from '@/components/BottomNavigation/BottomNavigationTab';
import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const tabs = [
    {
        key: 'matches',
        icon: (
            <svg width="36" height="36" viewBox="0 0 22 23" className={'-mt-1'}>
                <path d="M16.5 2.29614H5.5C3.97833 2.29614 2.75 3.51531 2.75 5.01864V15.0195C2.75 16.5228 3.97833 17.742 5.5 17.742H6.19667C6.93 17.742 7.62667 18.0261 8.14 18.5395L9.7075 20.0886C10.4225 20.7945 11.5867 20.7945 12.3017 20.0886L13.8692 18.5395C14.3825 18.0261 15.0883 17.742 15.8125 17.742H16.5C18.0217 17.742 19.25 16.5228 19.25 15.0195V5.01864C19.25 3.51531 18.0217 2.29614 16.5 2.29614ZM11.2567 14.1761C11.1192 14.222 10.89 14.222 10.7433 14.1761C9.55167 13.7636 6.875 12.0678 6.875 9.18031C6.88417 7.90614 7.90167 6.87948 9.16667 6.87948C9.91833 6.87948 10.5783 7.23698 11 7.79614C11.4217 7.23698 12.0817 6.87948 12.8333 6.87948C14.0983 6.87948 15.125 7.90614 15.125 9.18031C15.1158 12.0678 12.4483 13.7636 11.2567 14.1761Z" />
            </svg>
        )
    },
    {
        key: 'explore',
        icon: (
            <svg width="55" height="55" viewBox="0 0 48 48" className={'-mt-3'}>
                <circle cx="24" cy="24" r="23.5" stroke="url(#paint0_linear_129_1461)" />
                <g clipPath="url(#clip0_129_1461)">
                    <path
                        d="M24.4452 13.5371C18.9352 13.5371 14.4452 18.0271 14.4452 23.5371C14.4452 29.0471 18.9352 33.5371 24.4452 33.5371C29.9552 33.5371 34.4452 29.0471 34.4452 23.5371C34.4452 18.0271 29.9552 13.5371 24.4452 13.5371ZM22.9452 27.6671C20.3252 27.6671 20.3252 27.6671 20.3252 25.0471C20.3252 21.9471 22.8452 19.4271 25.9452 19.4271C28.5652 19.4271 28.5652 19.4271 28.5652 22.0471C28.5652 25.1371 26.0452 27.6671 22.9452 27.6671Z"
                        fill="#F0F1F5"
                    />
                </g>
                <defs>
                    <linearGradient
                        id="paint0_linear_129_1461"
                        x1="22.0376"
                        y1="13.892"
                        x2="12.2152"
                        y2="45.5419"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="white" stopOpacity="0" />
                        <stop offset="1" stopColor="white" stopOpacity="0.22" />
                    </linearGradient>
                    <clipPath id="clip0_129_1461">
                        <rect width="24" height="24" fill="white" transform="translate(12.4452 11.5371)" />
                    </clipPath>
                </defs>
            </svg>
        ),
        noSelectionClassName: 'fill-gray-900'
    },
    {
        key: 'profile',
        icon: (
            <svg width="36" height="36" viewBox="0 0 22 23" className={'-mt-1'}>
                <g clip-path="url(#clip0_127_1359)">
                    <path d="M14.0883 12.9905H7.91148C6.90758 12.9917 5.94515 13.391 5.23529 14.1009C4.52542 14.8107 4.12609 15.7732 4.12488 16.7771C4.12488 18.9046 5.84961 20.6294 7.97717 20.6294H14.0226C16.1501 20.6294 17.8749 18.9046 17.8749 16.7771C17.8737 15.7732 17.4743 14.8107 16.7645 14.1009C16.0546 13.391 15.0922 12.9917 14.0883 12.9905Z" />
                    <path d="M11 11.4628C13.5313 11.4628 15.5833 9.41078 15.5833 6.87948C15.5833 4.34817 13.5313 2.29614 11 2.29614C8.46865 2.29614 6.41663 4.34817 6.41663 6.87948C6.41663 9.41078 8.46865 11.4628 11 11.4628Z" />
                </g>
                <defs>
                    <clipPath id="clip0_127_1359">
                        <rect width="18.3333" height="18.3333" transform="translate(1.83325 2.29614)" />
                    </clipPath>
                </defs>
            </svg>
        )
    }
];

interface Props {
    className: string;
    disabled?: boolean;
    matchBadge?: boolean;
}
export default function BottomNavigation({ className, disabled, matchBadge }: Props) {
    const router = useRouter();
    let selectedTab = router.pathname.split('/')[1];
    return (
        <div
            className={clsx('fixed -bottom-1 z-50 w-full pointer-events-none', className)}
            style={{
                maxHeight: '85px',
                maxWidth: '378px',
                left: '50%',
                transform: 'translate(-50%, 0%)'
            }}
        >
            <svg viewBox="0 0 378 85" fill="none" className={'w-full'}>
                <g filter="url(#filter0_d_126_1328)">
                    <path
                        d="M17.5642 53.0014C22.184 37.3989 35.3923 25.7968 51.5328 23.7326C142.571 12.0896 234.527 12.0891 325.565 23.7311C341.712 25.7959 354.923 37.4056 359.538 53.0157L368.086 81.9258H9L17.5642 53.0014Z"
                        className={'fill-black'}
                    />
                    <path
                        d="M17.5642 53.0014C22.184 37.3989 35.3923 25.7968 51.5328 23.7326C142.571 12.0896 234.527 12.0891 325.565 23.7311C341.712 25.7959 354.923 37.4056 359.538 53.0157L368.086 81.9258H9L17.5642 53.0014Z"
                        className={'fill-telegram-button'}
                        style={{ opacity: '2%' }}
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_d_126_1328"
                        x="0"
                        y="0"
                        width="377.086"
                        height="84.9258"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                    >
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy="-6" />
                        <feGaussianBlur stdDeviation="4.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_126_1328" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_126_1328" result="shape" />
                    </filter>
                </defs>
            </svg>
            <div
                className={clsx(
                    `absolute top-3 bottom-0 left-8 right-8 h-full flex flex-row items-center`,
                    disabled ? '' : 'pointer-events-auto'
                )}
            >
                {tabs.map((it) => {
                    return (
                        <BottomNavigationTab
                            key={it.key}
                            path={it.key}
                            icon={it.icon}
                            isSelected={it.key === selectedTab}
                            badge={it.key === 'matches' && matchBadge}
                            noSelectionClassName={it.noSelectionClassName}
                        />
                    );
                })}
            </div>
        </div>
    );
}
