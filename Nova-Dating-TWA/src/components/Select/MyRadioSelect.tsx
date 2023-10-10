import { useState } from 'react';
import clsx from 'clsx';

interface Props {
    items: {
        id: string;
        name: string;
    }[];
    selectedID: string;
    onSelectionChanged?: (id: string) => void;
}

export default function MyRadioSelect(props: Props) {
    return (
        <div className={'w-full flex flex-col space-y-4'}>
            {props.items.map((it) => {
                return (
                    <button
                        key={it.id}
                        className={clsx(
                            'border-2 pl-2 pr-2 pt-4 pb-4 w-full select-none rounded-2xl bg-telegram-secondary-bg',
                            it.id == props.selectedID ? 'border-telegram-button' : 'border-transparent'
                        )}
                        onClick={() => {
                            props.onSelectionChanged?.(it.id);
                        }}
                    >
                        <div className={'flex flex-row justify-between items-center'}>
                            <p>{it.name}</p>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <g clipPath="url(#clip0_18_656)">
                                    <circle cx="12.9727" cy="12" r="12" className={'fill-telegram-bg'} />
                                    <circle
                                        cx="12.9727"
                                        cy="12"
                                        r="6"
                                        className={it.id == props.selectedID ? 'fill-telegram-button' : 'fill-none'}
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_18_656">
                                        <rect width="24" height="24" fill="white" transform="translate(0.972656)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
