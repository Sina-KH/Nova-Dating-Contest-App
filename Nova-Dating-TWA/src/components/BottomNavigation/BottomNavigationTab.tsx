import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

interface Props {
    path: string;
    icon: React.ReactNode;
    isSelected: boolean;
    badge?: boolean;
    noSelectionClassName?: string;
}

export function BottomNavigationTab({ path, icon, isSelected, badge, noSelectionClassName }: Props) {
    const router = useRouter();

    return (
        <button
            type="button"
            className={clsx('select-none flex flex-grow items-center justify-center relative')}
            onClick={() => {
                router
                    .push(
                        {
                            pathname: `/${path}`
                        },
                        `/${path}`,
                        { shallow: true }
                    )
                    .then();
            }}
        >
            <div className={isSelected ? 'fill-telegram-button' : noSelectionClassName || 'fill-white opacity-80'}>
                {icon}
            </div>
            {badge ? (
                <div className={'absolute -top-1 mr-6 left-auto right-auto rounded-full h-2 w-2 bg-red-600'} />
            ) : undefined}
        </button>
    );
}
