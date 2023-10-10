import React from 'react';

interface Props {
    icon: React.ReactNode;
    onClick: () => void;
}
export default function MyIconButton({ icon, onClick }: Props) {
    return (
        <button
            className={
                'select-none w-8 h-8 rounded-xl bg-telegram-secondary-bg flex flex-col items-center justify-center'
            }
            onClick={onClick}
        >
            {icon}
        </button>
    );
}
