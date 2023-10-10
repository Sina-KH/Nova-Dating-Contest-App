import { ITag } from '@/types/ITag';
import Image from 'next/image';
import { relativePathToURL } from '@/helpers/mediaHelpers';
import { IUser } from '@/types/IUser';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface Props {
    user: Partial<IUser>;
}
export default function ExploreUserCardInterests({ user }: Props) {
    const { t } = useTranslation();
    return (
        <>
            <p className={'mt-2 w-full'}>{t('explore.interests')}</p>
            <div className={'w-full mt-2 grid grid-cols-2 gap-2 pb-20'}>
                {user.interests.map((it: ITag) => {
                    return (
                        <div
                            key={it._id}
                            className={clsx(
                                'p-2 select-none rounded-full font-bold border-2 bg-telegram-secondary-bg',
                                'border-transparent text-telegram-text'
                            )}
                        >
                            <div className={'flex flex-col items-center'}>
                                <Image width={32} height={32} src={relativePathToURL(it.icon)} alt={it.name} />
                                <p>{it.name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
