import React, { useEffect, useMemo, useState } from 'react';
import MySwipeContainer from '@/components/Containers/MySwipeContainer/MySwipeContainer';
import { ExploreUsersRequest } from '@/api/requests/explore/exploreUsersRequest';
import { useSession } from '@/contexts/useSession';
import { IUser } from '@/types/IUser';
import { ReactionLikeRequest } from '@/api/requests/reaction/reactionLikeRequest';
import { ReactionDislikeRequest } from '@/api/requests/reaction/reactionDislikeRequest';
import { LogoIcon } from '@/assets/logoIcon';
import { useTranslation } from 'react-i18next';
import MyIconButton from '@/components/Button/MyIconButton';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ProfileSetSearchFiltersRequest } from '@/api/requests/profile/profileSetSearchFiltersRequest';
import MyLoadingView from '@/components/Loading/MyLoadingView';
import MyPromotionLabel from '@/components/Label/MyPromotionLabel';
const EmptyCard = dynamic(() => import('@/components/Card/EmptyCard'), {
    loading: () => <></>,
    ssr: false
});

export default function ExploreScreen() {
    const { sessionToken, user, setUser } = useSession();
    const [users, setUsers] = useState<Partial<IUser>[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadMoreNeeded, setIsLoadMoreNeeded] = useState(false);
    const [clearingSearchFilters, setClearingSearchFilters] = useState(false);
    const [swiperKey, setSwiperKey] = useState(0);

    const { t } = useTranslation();
    const router = useRouter();

    const userHasFilters = useMemo(() => {
        return (
            user?.searchFilters?.searchGenders?.length ||
            user?.searchFilters?.searchInterests?.length ||
            (user?.searchFilters?.searchAgeFrom || 18) > 18 ||
            (user?.searchFilters?.searchAgeTo || 100) < 100
        );
    }, [user]);

    // function to load users
    function exploreUsers() {
        setIsLoading(true);
        new ExploreUsersRequest({})
            .call(sessionToken)
            .then(({ users }) => {
                setUsers(users);
                setSwiperKey(swiperKey + 1);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }

    // load the users on first load
    useEffect(() => {
        exploreUsers();
    }, []);

    // if `isLoadMoreNeeded` or `users` value changed, check if explore list should be loaded again
    useEffect(() => {
        // check if `load more needed` and all the reactions are processed
        if (isLoadMoreNeeded) {
            const allReactionsProcessed = (users || []).findIndex((it) => it.reactReqInProgress) < 0;
            if (allReactionsProcessed) {
                setIsLoadMoreNeeded(false);
                exploreUsers();
            }
        }
    }, [isLoadMoreNeeded, users]);

    // called when user swiped a user and liked!
    function userLiked(userPID: string) {
        const user = users?.find((it) => it.pID === userPID);
        if (!user) return;
        user.reacted = 'liked';
        user.reactReqInProgress = true;
        setUsers(
            users?.map((it) => {
                if (it.pID === userPID) return user;
                return it;
            }) || null
        );
        new ReactionLikeRequest({ userPID })
            .call(sessionToken)
            .then(() => {
                delete user.reactReqInProgress;
                setUsers(
                    users?.map((it) => {
                        if (it.pID === userPID) return user;
                        return it;
                    }) || null
                );
            })
            .catch(() => {
                delete user.reactReqInProgress;
                user.reacted = undefined;
                setUsers(
                    users?.map((it) => {
                        if (it.pID === userPID) return user;
                        return it;
                    }) || null
                );
            });
    }

    // called when user swiped a user and disliked!
    function userDisliked(userPID: string) {
        const user = users?.find((it) => it.pID === userPID);
        if (!user) return;
        user.reacted = 'disliked';
        user.reactReqInProgress = true;
        setUsers(
            users?.map((it) => {
                if (it.pID === userPID) return user;
                return it;
            }) || null
        );
        new ReactionDislikeRequest({ userPID })
            .call(sessionToken)
            .then(() => {
                delete user.reactReqInProgress;
                setUsers(
                    users?.map((it) => {
                        if (it.pID === userPID) return user;
                        return it;
                    }) || null
                );
            })
            .catch(() => {
                delete user.reactReqInProgress;
                user.reacted = undefined;
                setUsers(
                    users?.map((it) => {
                        if (it.pID === userPID) return user;
                        return it;
                    }) || null
                );
            });
    }

    // called when user reacted to all users
    function loadMoreNeeded() {
        setIsLoadMoreNeeded(true);
    }

    function filtersPressed() {
        const filtersPath = '/explore/filters';
        router
            .push(
                {
                    pathname: filtersPath
                },
                filtersPath,
                { shallow: true }
            )
            .then();
    }

    // clear search filters and reload
    function clearSearchFilters() {
        if (clearingSearchFilters) return;
        setClearingSearchFilters(true);
        const searchFilters = {
            searchAgeFrom: 18,
            searchAgeTo: 100,
            searchInterests: [],
            searchGenders: []
        };
        new ProfileSetSearchFiltersRequest(searchFilters)
            .call(sessionToken)
            .then(() => {
                setUser(
                    user
                        ? {
                              ...user,
                              searchFilters: searchFilters
                          }
                        : undefined
                );
                exploreUsers();
                setClearingSearchFilters(false);
            })
            .catch(() => {
                setClearingSearchFilters(false);
            });
    }

    return (
        <>
            <div className={'w-full flex flex-row p-8 items-center gap-2'}>
                <LogoIcon />
                <MyPromotionLabel className={'font-bold text-2xl flex-grow'} text={t('explore.title')} />
                {/*Filters button*/}
                <MyIconButton
                    icon={
                        <svg width="22" height="23" viewBox="0 0 22 23" fill="none">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.6042 2.75641C13.1105 2.75641 13.5209 3.16681 13.5209 3.67308V7.33974C13.5209 7.846 13.1105 8.25641 12.6042 8.25641C12.098 8.25641 11.6876 7.846 11.6876 7.33974V6.42308H2.52091C2.01465 6.42308 1.60425 6.01267 1.60425 5.50641C1.60425 5.00015 2.01465 4.58974 2.52091 4.58974H11.6876V3.67308C11.6876 3.16681 12.098 2.75641 12.6042 2.75641ZM15.3542 5.50641C15.3542 5.00015 15.7647 4.58974 16.2709 4.58974H19.0209C19.5272 4.58974 19.9376 5.00015 19.9376 5.50641C19.9376 6.01267 19.5272 6.42308 19.0209 6.42308H16.2709C15.7647 6.42308 15.3542 6.01267 15.3542 5.50641ZM9.85425 9.17308C10.3605 9.17308 10.7709 9.58348 10.7709 10.0897V11.0064H19.9376C20.4438 11.0064 20.8542 11.4168 20.8542 11.9231C20.8542 12.4293 20.4438 12.8397 19.9376 12.8397H10.7709V13.7564C10.7709 14.2627 10.3605 14.6731 9.85425 14.6731C9.34799 14.6731 8.93758 14.2627 8.93758 13.7564V10.0897C8.93758 9.58348 9.34799 9.17308 9.85425 9.17308ZM1.60425 11.9231C1.60425 11.4168 2.01465 11.0064 2.52091 11.0064H6.18758C6.69384 11.0064 7.10425 11.4168 7.10425 11.9231C7.10425 12.4293 6.69384 12.8397 6.18758 12.8397H2.52091C2.01465 12.8397 1.60425 12.4293 1.60425 11.9231ZM12.6042 15.5897C13.1105 15.5897 13.5209 16.0001 13.5209 16.5064V20.1731C13.5209 20.6793 13.1105 21.0897 12.6042 21.0897C12.098 21.0897 11.6876 20.6793 11.6876 20.1731V19.2564H2.52091C2.01465 19.2564 1.60425 18.846 1.60425 18.3397C1.60425 17.8335 2.01465 17.4231 2.52091 17.4231H11.6876V16.5064C11.6876 16.0001 12.098 15.5897 12.6042 15.5897ZM15.3542 18.3397C15.3542 17.8335 15.7647 17.4231 16.2709 17.4231H19.0209C19.5272 17.4231 19.9376 17.8335 19.9376 18.3397C19.9376 18.846 19.5272 19.2564 19.0209 19.2564H16.2709C15.7647 19.2564 15.3542 18.846 15.3542 18.3397Z"
                                className={'fill-telegram-text'}
                            />
                        </svg>
                    }
                    onClick={filtersPressed}
                />
            </div>
            {users?.length ? (
                <MySwipeContainer
                    key={swiperKey}
                    users={users || []}
                    userLiked={userLiked}
                    userDisliked={userDisliked}
                    loadMoreNeeded={loadMoreNeeded}
                />
            ) : isLoading ? (
                // Loading View
                <div className={'flex-grow flex items-center pb-20'}>
                    <MyLoadingView />
                </div>
            ) : (
                <div className={'flex-grow flex items-center pb-20'}>
                    <EmptyCard
                        title={t('explore.empty.title')}
                        subTitle={t('explore.empty.subTitle')}
                        action={
                            userHasFilters
                                ? {
                                      title: t('explore.empty.clear'),
                                      onClick: clearSearchFilters
                                  }
                                : undefined
                        }
                    />
                </div>
            )}
        </>
    );
}
