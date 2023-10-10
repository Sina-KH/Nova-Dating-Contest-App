import { hashToImageURL } from '@/helpers/mediaHelpers';
import { IUser, userTitle } from '@/types/IUser';

interface Props {
    user: Partial<IUser>;
}
export default function ExploreUserCardImage({ user }: Props) {
    return (
        <div className={'relative rounded-2xl w-full'}>
            {user.photo?.hash ? (
                <img
                    src={hashToImageURL(user.photo!.hash)!}
                    alt={'profile'}
                    className={'w-full rounded-2xl aspect-square bg-telegram-secondary-bg'}
                />
            ) : (
                <img src={'/assets/images/placeholder.jpg'} className={'w-full rounded-2xl aspect-square'} />
            )}
            {/*top user data*/}
            <div className={'absolute top-0 left-0 right-0 rounded-t-2xl'}>
                {/* Top shadow */}
                <svg viewBox="0 0 328 61" className={'w-full'} fill="none">
                    <path
                        d="M328 61L0 61L-4.02145e-06 15C-4.74568e-06 6.71573 6.71572 -2.43002e-06 15 -3.15425e-06L313 -2.92062e-05C321.284 -2.99305e-05 328 6.7157 328 15L328 61Z"
                        fill="url(#paint0_linear_16_3174)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_16_3174"
                            x1="164"
                            y1="61"
                            x2="164"
                            y2="-1.61802e-05"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopOpacity="0" />
                            <stop offset="1" stopOpacity="0.65" />
                        </linearGradient>
                    </defs>
                </svg>

                {/*user's name and age*/}
                <p
                    className={
                        'absolute top-2 left-2 right-2 w-full text-telegram-button-text font-bold text-lg text-left'
                    }
                >
                    {userTitle(user)}
                </p>
            </div>
        </div>
    );
}
