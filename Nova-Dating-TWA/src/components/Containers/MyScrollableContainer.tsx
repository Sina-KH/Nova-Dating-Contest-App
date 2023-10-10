import React from 'react';
import clsx from 'clsx';

interface Props {
    className?: string;
    children: React.ReactNode;
}

// this container is used in almost all the pages containing bottom navigation and content that scrolls.
export default function MyScrollableContainer({ className, children }: Props) {
    return (
        <div className={clsx('w-full h-full flex flex-col items-center p-8 pb-20 overflow-y-auto', className)}>
            {children}
        </div>
    );
}
