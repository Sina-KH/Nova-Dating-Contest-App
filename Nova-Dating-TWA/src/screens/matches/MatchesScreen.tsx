import { useSession } from '@/contexts/useSession';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IMatch } from '@/types/IMatch';
import { MatchListRequest } from '@/api/requests/match/matchListRequest';
import { LogoIcon } from '@/assets/logoIcon';
import ExploreUserCardImage from '@/components/Card/ExploreUserCard/ExploreUserCardImage';
import MyButton from '@/components/Button/MyButton';
import MyLoadingView from '@/components/Loading/MyLoadingView';
import MyPromotionLabel from '@/components/Label/MyPromotionLabel';
import { MatchRequestLinkRequest } from '@/api/requests/match/matchRequestLinkRequest';
import clsx from 'clsx';
import EmptyCard from '@/components/Card/EmptyCard';
import { useSocket } from '@/contexts/useSocket';
import MyScrollableContainer from '@/components/Containers/MyScrollableContainer';

export default function MatchesScreen() {
    const { sessionToken, user } = useSession();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [matches, setMatches] = useState<IMatch[]>([]);
    const { socket } = useSocket();

    // pagination
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);

    // load first page on mount
    useEffect(() => {
        setIsLoading(true);
        new MatchListRequest({})
            .call(sessionToken)
            .then((response) => {
                setIsLoading(false);
                setMatches(response.matches || []);
            })
            .catch((e) => {
                setIsLoading(false);
            });
    }, [sessionToken]);

    // Pagination logic
    const observer = useRef<IntersectionObserver>();
    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isLoadingMore) {
                    // load more
                    if (!matches.length) return;
                    setIsLoadingMore(true);
                    new MatchListRequest({ before: matches[matches.length - 1]._id })
                        .call(sessionToken)
                        .then((response) => {
                            if (!response.matches.length) setHasNextPage(false);
                            setMatches(matches.concat(response.matches));
                            setIsLoadingMore(false);
                        })
                        .catch((e) => {
                            setIsLoadingMore(false);
                        });
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, hasNextPage, isLoadingMore, matches, sessionToken]
    );

    // listen for new match on socket
    useEffect(() => {
        socket?.off('match');
        socket?.on('match', (data) => {
            if (data.match) setMatches([data.match].concat(matches));
        });
        return () => {
            socket?.off('match');
        };
    }, [matches, socket]);

    return (
        <MyScrollableContainer>
            <div className={'w-full flex flex-row pb-8 items-center gap-2'}>
                <LogoIcon />
                <MyPromotionLabel className={'font-bold text-2xl flex-grow'} text={t('matches.title')} />
            </div>

            {isLoading ? (
                // Loading View
                <div className={'flex-grow flex items-center pb-20'}>
                    <MyLoadingView />
                </div>
            ) : matches.length ? (
                <>
                    <div className={'grid grid-cols-2 gap-4'}>
                        {matches.map((match) => {
                            const peerUser = match.firstUser.pID === user?.pID ? match.secondUser : match.firstUser;
                            return (
                                <div
                                    key={match._id}
                                    className={'flex flex-col'}
                                    ref={matches[matches.length - 1]._id === match._id ? lastElementRef : null}
                                >
                                    <ExploreUserCardImage user={peerUser} />
                                    <MyButton
                                        disabled={match.linkSent}
                                        className={'mt-1'}
                                        onClick={() => {
                                            new MatchRequestLinkRequest({
                                                matchID: match._id
                                            })
                                                .call(sessionToken)
                                                .then(() => {
                                                    match.linkSent = true;
                                                    setMatches(
                                                        matches?.map((it) => {
                                                            if (it._id === match._id) return match;
                                                            return it;
                                                        }) || null
                                                    );
                                                });
                                            /*if (peerUser._id?.startsWith('t_')) {
                                                // @ts-ignore
                                                const openTelegramLink = window.Telegram?.WebApp?.openTelegramLink;
                                                const link = 'tg://user?id=' + peerUser._id;
                                                if (openTelegramLink) {
                                                    openTelegramLink(link);
                                                } else {
                                                    router.push('tg://user?id=' + peerUser._id!.substring(2)).then();
                                                }
                                            }*/
                                        }}
                                    >
                                        <div className={'flex flex-row justify-center items-center'}>
                                            {/*Chat Icon*/}
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 19 19"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g id="vuesax/bold/messages-2">
                                                    <g id="messages-2">
                                                        <path
                                                            id="Vector"
                                                            d="M14.3525 13.4968L14.645 15.8668C14.72 16.4893 14.0525 16.9243 13.52 16.6018L10.925 15.0568C10.745 14.9518 10.7 14.7268 10.7975 14.5468C11.1725 13.8568 11.375 13.0768 11.375 12.2968C11.375 9.55177 9.02004 7.31677 6.12504 7.31677C5.53254 7.31677 4.95504 7.40677 4.41504 7.58677C4.13754 7.67677 3.86754 7.42177 3.93504 7.13677C4.61754 4.40677 7.24254 2.37427 10.3775 2.37427C14.0375 2.37427 17 5.14177 17 8.55427C17 10.5793 15.9575 12.3718 14.3525 13.4968Z"
                                                            className={
                                                                match.linkSent
                                                                    ? 'fill-telegram-text opacity-70'
                                                                    : 'fill-telegram-button-text'
                                                            }
                                                        />
                                                        <path
                                                            id="Vector_2"
                                                            d="M10.25 12.2968C10.25 13.1893 9.92 14.0143 9.365 14.6668C8.6225 15.5668 7.445 16.1443 6.125 16.1443L4.1675 17.3068C3.8375 17.5093 3.4175 17.2318 3.4625 16.8493L3.65 15.3718C2.645 14.6743 2 13.5568 2 12.2968C2 10.9768 2.705 9.81427 3.785 9.12427C4.4525 8.68927 5.255 8.44177 6.125 8.44177C8.405 8.44177 10.25 10.1668 10.25 12.2968Z"
                                                            className={
                                                                match.linkSent
                                                                    ? 'fill-telegram-text opacity-70'
                                                                    : 'fill-telegram-button-text'
                                                            }
                                                        />
                                                    </g>
                                                </g>
                                            </svg>
                                            {/*Start chat text*/}
                                            <p
                                                className={clsx(
                                                    'px-2 text-sm',
                                                    match.linkSent
                                                        ? 'text-telegram-text opacity-70'
                                                        : 'text-telegram-button-text'
                                                )}
                                            >
                                                {t(match.linkSent ? 'matches.linkSent' : 'matches.startChat')}
                                            </p>
                                        </div>
                                    </MyButton>
                                </div>
                            );
                        })}
                    </div>
                    {isLoadingMore ? <MyLoadingView /> : undefined}
                </>
            ) : (
                <div className={'flex-grow flex items-center pb-20'}>
                    <EmptyCard title={t('matches.empty.title')} subTitle={t('matches.empty.subTitle')} />
                </div>
            )}
        </MyScrollableContainer>
    );
}
