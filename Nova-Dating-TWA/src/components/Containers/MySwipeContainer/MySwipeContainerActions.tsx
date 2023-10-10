import React from 'react';

interface Props {
    onLike: () => void;
    onDislike: () => void;
}
export default function MySwipeContainerActions({ onLike, onDislike }: Props) {
    return (
        <div
            className={'fixed bottom-0 w-full flex flex-row justify-center mb-20 gap-6'}
            style={{
                zIndex: '9999'
            }}
        >
            {/*Dislike*/}
            <button className={'select-none drop-shadow-2xl'} onClick={onDislike}>
                <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="28.957" cy="28.9167" r="28" fill="white" />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.0386 22.9983C23.4436 22.5933 24.1002 22.5933 24.5052 22.9983L28.9571 27.4502L33.409 22.9983C33.814 22.5933 34.4706 22.5933 34.8756 22.9983C35.2806 23.4033 35.2806 24.0599 34.8756 24.4649L30.4237 28.9168L34.8756 33.3687C35.2806 33.7737 35.2806 34.4303 34.8756 34.8353C34.4706 35.2403 33.814 35.2403 33.409 34.8353L28.9571 30.3834L24.5052 34.8353C24.1002 35.2403 23.4436 35.2403 23.0386 34.8353C22.6336 34.4303 22.6336 33.7737 23.0386 33.3687L27.4905 28.9168L23.0386 24.4649C22.6336 24.0599 22.6336 23.4033 23.0386 22.9983Z"
                        fill="#0E1621"
                        stroke="#0E1621"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/*Like*/}
            <button className={'select-none drop-shadow-2xl'} onClick={onLike}>
                <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="28.5" cy="28" r="28" fill="white" className={'fill-white'} />
                    <path
                        d="M23.8333 19.7036C20.6833 19.7036 18.1296 22.2573 18.1296 25.4073C18.1296 31.111 24.8704 36.2962 28.5 37.5024C32.1296 36.2962 38.8704 31.111 38.8704 25.4073C38.8704 22.2573 36.3167 19.7036 33.1667 19.7036C31.2376 19.7036 29.5322 20.6613 28.5 22.1271C27.4678 20.6613 25.7624 19.7036 23.8333 19.7036Z"
                        fill="#CC4444"
                        stroke="#CC4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
}
