import React from 'react';
import clsx from 'clsx';

interface Props {
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    onClick: () => void;
    isLoading?: boolean;
}

export default function MyButton({ className, disabled, onClick, children, isLoading }: Props) {
    const button = (
        <button
            className={clsx(
                'relative w-full select-none text-telegram-button-text font-bold text-lg py-2 px-4 rounded-xl',
                disabled ? 'bg-telegram-secondary-bg text-telegram-hint' : 'bg-telegram-button'
            )}
            onClick={onClick}
        >
            {children}
            {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-end px-4">
                    <div className="w-6 h-6 border-t-2 border-b-2 border-telegram-button opacity-20 rounded-full animate-spin"></div>
                </div>
            ) : undefined}
        </button>
    );
    return <>{className ? <div className={clsx('w-full', className)}>{button}</div> : button}</>;
}
