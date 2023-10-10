import React from 'react';

interface Props {
    children: React.ReactNode;
}

export default function MySubTitle({ children }: Props) {
    return <p className={'font-medium text-telegram-hint'}>{children}</p>;
}
