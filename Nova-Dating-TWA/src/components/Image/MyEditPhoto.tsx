import Image from 'next/image';
import React, { useRef } from 'react';

interface Props {
    defaultImage?: string;
    onImageSelect?: (newImage: Blob) => void;
}

export default function MyEditPhoto({ defaultImage, onImageSelect }: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (!selectedFile) return;
        onImageSelect?.(selectedFile);
    };

    return (
        <div
            className="relative"
            onClick={() => {
                fileInputRef.current?.click();
            }}
        >
            <input
                className={'hidden'}
                type="file"
                accept="image/*"
                onChange={handleFileSelected}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />

            {defaultImage ? (
                <Image
                    src={defaultImage}
                    width={100}
                    height={100}
                    alt={'profile'}
                    className={'rounded-3xl'}
                    style={{ width: '100px', height: '100px' }}
                />
            ) : (
                <div className={'rounded-3xl bg-telegram-secondary-bg'} style={{ width: '100px', height: '100px' }}>
                    <div className={'h-full fill-telegram-hint flex flex-col items-center justify-center'}>
                        <svg width="48" height="48" viewBox="0 0 24 24">
                            <path
                                d="M12 10C13.933 10 15.5 8.433 15.5 6.5C15.5 4.56701 13.933 3 12 3C10.067 3 8.5 4.56701 8.5 6.5C8.5 8.433 10.067 10 12 10Z"
                                fill="#ADAFBB"
                                stroke="#ADAFBB"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3 20.4V21H21V20.4C21 18.1598 21 17.0397 20.5641 16.184C20.1806 15.4314 19.5686 14.8195 18.816 14.436C17.9603 14 16.8402 14 14.6 14H9.4C7.1598 14 6.0397 14 5.18405 14.436C4.43139 14.8195 3.81947 15.4314 3.43598 16.184C3 17.0397 3 18.1598 3 20.4Z"
                                fill="#ADAFBB"
                                stroke="#ADAFBB"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            )}

            {/*Bottom icon*/}
            <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                className="absolute bottom-0 right-0 w-6 h-6 m-4 -mr-2 -mb-2 fill-telegram-text"
            >
                <g filter="url(#filter0_b_3_145)">
                    <rect x="0.972656" width="32" height="32" rx="10" fillOpacity="0.2" />
                    <path
                        d="M13.9727 10.0001C14.1019 10 14.2352 10 14.3727 10H19.5727C19.7101 10 19.8434 10 19.9727 10.0001M13.9727 10.0001C11.996 10.0016 10.9598 10.0268 10.1567 10.436C9.40405 10.8195 8.79212 11.4314 8.40863 12.184C7.97266 13.0397 7.97266 14.1598 7.97266 16.4V17.6C7.97266 19.8402 7.97266 20.9603 8.40863 21.816C8.79212 22.5686 9.40405 23.1805 10.1567 23.564C11.0123 24 12.1324 24 14.3727 24H19.5727C21.8129 24 22.933 24 23.7886 23.564C24.5413 23.1805 25.1532 22.5686 25.5367 21.816C25.9727 20.9603 25.9727 19.8402 25.9727 17.6V16.4C25.9727 14.1598 25.9727 13.0397 25.5367 12.184C25.1532 11.4314 24.5413 10.8195 23.7886 10.436C22.9855 10.0268 21.9494 10.0016 19.9727 10.0001M13.9727 10.0001V9C13.9727 7.89543 14.8681 7 15.9727 7H17.9727C19.0772 7 19.9727 7.89543 19.9727 9V10.0001M19.9727 17C19.9727 18.6569 18.6295 20 16.9727 20C15.3158 20 13.9727 18.6569 13.9727 17C13.9727 15.3431 15.3158 14 16.9727 14C18.6295 14 19.9727 15.3431 19.9727 17Z"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_b_3_145"
                        x="-25.0273"
                        y="-26"
                        width="84"
                        height="84"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="13" />
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3_145" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3_145" result="shape" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
