import { ITag } from '@/types/ITag';
import clsx from 'clsx';
import Image from 'next/image';
import { relativePathToURL } from '@/helpers/mediaHelpers';

interface Props {
    className?: string;
    items: {
        id: string;
        name: string;
    }[];
    selectedItems: string[];
    onSelectionChanged?: (newSelection: string[]) => void;
}

export default function MyMultiSelect({ className, items, selectedItems, onSelectionChanged }: Props) {
    return (
        <div className={clsx('w-full grid grid-cols-3 gap-2', className)}>
            {items.map((it) => {
                const isSelected = selectedItems.indexOf(it.id) > -1;
                return (
                    <button
                        key={it.id}
                        className={clsx(
                            'p-2 select-none rounded-3xl bg-telegram-bg',
                            isSelected ? 'bg-telegram-button' : ''
                        )}
                        onClick={() => {
                            if (isSelected)
                                selectedItems = selectedItems.filter((selectedItem) => selectedItem !== it.id);
                            else selectedItems.push(it.id);
                            onSelectionChanged?.([...selectedItems]);
                        }}
                    >
                        <p className={clsx('font-bold', isSelected ? 'text-telegram-button-text' : '')}>{it.name}</p>
                    </button>
                );
            })}
        </div>
    );
}
