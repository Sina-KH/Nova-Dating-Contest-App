import React, { TouchEvent, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { SwipeEventData } from 'react-swipeable/src/types';
import { IUser } from '@/types/IUser';
import MySwipeContainerActions from '@/components/Containers/MySwipeContainer/MySwipeContainerActions';
import ExploreUserCard from '@/components/Card/ExploreUserCard/ExploreUserCard';

interface Props {
    users: Partial<IUser>[];
    userLiked: (userPID: string) => void;
    userDisliked: (userPID: string) => void;
    loadMoreNeeded: () => void;
}

export default function MySwipeContainer({ users, userLiked, userDisliked, loadMoreNeeded }: Props) {
    // current rotation and translate based on drag data
    const [rotation, setRotation] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    // current active index
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSwipe = (direction: string, fromActionButton?: boolean) => {
        // check if all users are swiped and nothing is selected
        if (activeIndex < 0 || (!fromActionButton && Math.abs(translateX) < 50)) return;

        if (direction === 'left') {
            userDisliked(users[activeIndex].pID!);
        } else if (direction === 'right') {
            userLiked(users[activeIndex].pID!);
        }
        // find and activate first visible card
        const nextIndex = users.findIndex((it) => !it.reacted);
        if (nextIndex >= 0) {
            setActiveIndex(nextIndex);
        } else {
            // reacted to all, need to load more. (after reaction requests)
            loadMoreNeeded();
            setActiveIndex(-1);
        }
    };

    // handle user swipes/drags
    const handleSwiping = (eventData: SwipeEventData) => {
        const maxRotation = 25;
        const maxDragDistance = 150;

        // Calculate the new rotation and translation
        const newRotation = (eventData.deltaX / maxDragDistance) * maxRotation;
        const newTranslateX = eventData.deltaX;

        setRotation(newRotation);
        setTranslateX(newTranslateX);
    };

    const handleSwiped = () => {
        // Reset rotation and translation when swipe ends
        setRotation(0);
        setTranslateX(0);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
        onSwiping: handleSwiping,
        onSwiped: handleSwiped
    });

    // I tried to stop twa from collapsing but did not work!

    /*const handleTouchStart = (event: TouchEvent) => {
        //event.stopPropagation(); // Prevent touchstart event from propagating to the parent
    };
    const handleTouchMove = (event: TouchEvent) => {
        //event.stopPropagation(); // Prevent touchmove event from propagating to the parent
    };*/

    return (
        <div className={'relative flex flex-col w-full h-full overflow-x-hidden'}>
            {/*swipe container*/}
            <div
                className="relative swipe-container w-full h-full"
                {...handlers}
                /*onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}*/
            >
                {users.map((user, index) => {
                    return (
                        <ExploreUserCard
                            key={index}
                            user={user}
                            isActive={index === activeIndex}
                            isPassed={index < activeIndex}
                            zIndex={users.length - index}
                            translateX={translateX}
                            rotation={rotation}
                        />
                    );
                })}
            </div>
            {/*Dislike hover view*/}
            <div
                className={'absolute top-32 left-0 drop-shadow-2xl'}
                style={{
                    zIndex: '9999',
                    opacity: -translateX / 100,
                    transform: `translateX(${-translateX / 3}px) rotate(${rotation}deg)`,
                    transition: `transform 0.1s ease`
                }}
            >
                <svg width="114" height="114" viewBox="0 0 57 57" fill="none">
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
            </div>
            {/*Like hover view*/}
            <div
                className={'absolute top-32 right-0 drop-shadow-2xl'}
                style={{
                    zIndex: '9999',
                    opacity: translateX / 100,
                    transform: `translateX(${-translateX / 3}px) rotate(${-rotation}deg)`,
                    transition: `transform 0.1s ease`
                }}
            >
                <svg width="114" height="112" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </div>
            <MySwipeContainerActions
                onLike={() => {
                    handleSwipe('right', true);
                }}
                onDislike={() => {
                    handleSwipe('left', true);
                }}
            />
        </div>
    );
}
