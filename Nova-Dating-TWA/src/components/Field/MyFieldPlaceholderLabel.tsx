import React from 'react';
import clsx from 'clsx';

interface Props {
    placeholder: string;
    isFocused: boolean;
    isFieldEmpty: boolean;
}

// use this component to add material placeholder to fields
export default function MyFieldPlaceholderLabel({ placeholder, isFocused, isFieldEmpty }: Props) {
    return (
        <label
            className={clsx([
                'pointer-events-none absolute left-0 flex h-full w-full select-none' +
                    ' text-[11px] font-normal transition-all' +
                    ' before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border' +
                    ' before:block before:w-2.5' +
                    ' after:pointer-events-none after:mt-[6.5px] after:ml-1 after:block' +
                    ' after:transition-all',
                isFieldEmpty && !isFocused ? ' text-sm leading-[3.75]' + ' text-telegram-hint top-1' : 'top-2',
                isFocused ? ' text-[11px]' + ' leading-tight text-telegram-button' : 'text-telegram-hint'
            ])}
        >
            {placeholder}
        </label>
    );
}
