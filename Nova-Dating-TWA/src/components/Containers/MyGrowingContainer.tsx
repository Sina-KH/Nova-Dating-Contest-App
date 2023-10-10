import React from 'react';
import clsx from 'clsx';

interface Props {
    className?: string;
    children: React.ReactNode;
}

// content that grows in flex container
export default function MyGrowingContainer({ className, children }: Props) {
    return <div className={clsx('w-full flex-grow', className)}>{children}</div>;
}
