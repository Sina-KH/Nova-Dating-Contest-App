import React from 'react';
import clsx from 'clsx';

interface Props {
    className?: string;
    children: React.ReactNode;
    onClick: () => void;
}

export default function MySecondaryButton({ className, onClick, children }: Props) {
    return (
        <button className={clsx('select-none text-telegram-button font-bold text-lg', className)} onClick={onClick}>
            {children}
        </button>
    );
}
