import React from 'react';

export default function MyLoadingView() {
    return (
        <div className={'relative h-24 w-24 m-10'}>
            <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="w-6 h-6 border-t-2 border-b-2 border-telegram-button rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
