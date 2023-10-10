import { IUser } from '@/types/IUser';
import ExploreUserCardImage from '@/components/Card/ExploreUserCard/ExploreUserCardImage';
import ExploreUserCardInterests from '@/components/Card/ExploreUserCard/ExploreUserCardInterests';

interface Props {
    user: Partial<IUser>;
    isActive: boolean;
    isPassed: boolean;
    translateX: number;
    rotation: number;
    zIndex: number;
}
export default function ExploreUserCard({ user, isActive, isPassed, translateX, rotation, zIndex }: Props) {
    let positionStyles = {};
    switch (user.reacted) {
        case 'liked':
            positionStyles = {
                transform: `translateX(800px) rotate(80deg)`,
                transition: `transform 0.5s ease`
            };
            break;
        case 'disliked':
            positionStyles = {
                transform: `translateX(-800px) rotate(-80deg)`,
                transition: `transform 0.5s ease`
            };
            break;
        default:
            if (isActive) {
                positionStyles = {
                    transform: `translateY(${Math.abs(
                        translateX / 2
                    )}px) translateX(${translateX}px) rotate(${rotation}deg)`,
                    transition: `transform 0.1s ease`
                };
            }
    }

    return (
        <div
            key={user.pID}
            className={'absolute top-0 bottom-8 left-8 right-8'}
            style={{
                ...positionStyles,
                zIndex: zIndex,
                opacity: isPassed || isActive ? '100%' : Math.abs(translateX / 10) + '%'
            }}
        >
            {/*user image container*/}
            <ExploreUserCardImage user={user} />
            {/*user interests*/}
            <ExploreUserCardInterests user={user} />
        </div>
    );
}
