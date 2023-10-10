import { ITag } from '@/types/ITag';
import clsx from 'clsx';
import Image from 'next/image';
import { relativePathToURL } from '@/helpers/mediaHelpers';

interface Props {
    className?: string;
    tags: ITag[];
    selectedTags: string[];
    onSelectionChanged?: (newSelection: string[]) => void;
    defaultBackground?: string;
}

export default function MyTagsSelector({
    className,
    tags,
    selectedTags,
    onSelectionChanged,
    defaultBackground
}: Props) {
    return (
        <div className={clsx('w-full grid grid-cols-2 gap-2', className)}>
            {tags.map((it) => {
                const isSelected = selectedTags.indexOf(it._id) > -1;
                return (
                    <button
                        key={it._id}
                        className={clsx(
                            'p-2 select-none rounded-full border-2',
                            defaultBackground || 'bg-telegram-secondary-bg',
                            isSelected ? 'border-telegram-button' : 'border-transparent'
                        )}
                        onClick={() => {
                            if (isSelected) selectedTags = selectedTags.filter((selectedTag) => selectedTag !== it._id);
                            else selectedTags.push(it._id);
                            onSelectionChanged?.([...selectedTags]);
                        }}
                    >
                        <div className={'flex flex-col items-center'}>
                            <Image width={32} height={32} src={relativePathToURL(it.icon)} alt={it.name} />
                            <p className={isSelected ? 'text-telegram-button' : 'text-telegram-text'}>{it.name}</p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
