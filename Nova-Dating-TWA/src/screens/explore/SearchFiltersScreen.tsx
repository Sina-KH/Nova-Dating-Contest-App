import { useSession } from '@/contexts/useSession';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import MyButton from '@/components/Button/MyButton';
import MyTagsSelector from '@/components/Select/MyTagsSelector';
import { ITag, ITagType } from '@/types/ITag';
import { TagListRequest } from '@/api/requests/tagListRequest';
import MySecondaryButton from '@/components/Button/MySecondaryButton';
import MyMultiSelect from '@/components/Select/MyMultiSelect';
import MyAgeSelector from '@/components/Select/MyAgeSelector';
import { ProfileSetSearchFiltersRequest } from '@/api/requests/profile/profileSetSearchFiltersRequest';
import MyLoadingView from '@/components/Loading/MyLoadingView';
import MyScrollableContainer from '@/components/Containers/MyScrollableContainer';

export default function SearchFiltersScreen() {
    const { sessionToken, user, setUser } = useSession();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [isLoadingInterests, setIsLoadingInterests] = useState(true);
    const [interests, setInterests] = useState<ITag[] | null>(null);
    const [selectedSearchGenders, setSelectedSearchGenders] = useState(user?.searchFilters?.searchGenders || []);
    const [sliderKey, setSliderKey] = useState(0);
    const [selectedAge, setSelectedAge] = useState([
        user?.searchFilters?.searchAgeFrom || 18,
        user?.searchFilters?.searchAgeTo || 100
    ]);
    const [selectedSearchInterests, setSelectedSearchInterests] = useState<string[]>(
        user?.searchFilters?.searchInterests || []
    );

    useEffect(() => {
        new TagListRequest({ type: ITagType.interests })
            .call(sessionToken)
            .then((response) => {
                setIsLoadingInterests(false);
                setInterests(response?.tags ?? []);
            })
            .catch((e) => {
                setIsLoadingInterests(false);
            });
    }, [sessionToken]);

    function clearSearchFiltersPressed() {
        // clear search filters
        setSelectedSearchGenders([]);
        setSelectedSearchInterests([]);
        setSelectedAge([18, 100]);
        setSliderKey(sliderKey + 1);
    }

    return (
        <MyScrollableContainer className={'space-y-4'}>
            <div className={'relative w-full pb-4 items-center'}>
                <MySecondaryButton
                    onClick={() => {
                        clearSearchFiltersPressed();
                    }}
                    className={'absolute top-0 bottom-4'}
                >
                    {t('explore.filters.clear')}
                </MySecondaryButton>
                <p className={'font-bold text-2xl flex-grow text-center'}>{t('explore.filters.title')}</p>
            </div>

            <div className={'w-full flex flex-col gap-4 items-center'}>
                {/*Gender selection*/}
                <div className={'w-full rounded-3xl p-4 bg-telegram-secondary-bg'}>
                    <p className={'w-full mb-2 font-bold'}>{t('explore.filters.gender')}</p>
                    <MyMultiSelect
                        items={[
                            {
                                id: 'male',
                                name: t('register.gender.male')
                            },
                            {
                                id: 'female',
                                name: t('register.gender.female')
                            },
                            {
                                id: 'beyondBinary',
                                name: t('register.gender.beyondBinary')
                            }
                        ]}
                        selectedItems={selectedSearchGenders}
                        onSelectionChanged={(selectedIDs: string[]) => {
                            setSelectedSearchGenders(selectedIDs);
                        }}
                    />
                </div>
                {/*Age selection*/}
                <div className={'w-full rounded-3xl p-4 bg-telegram-secondary-bg'}>
                    <p className={'w-full mb-2 font-bold'}>{t('explore.filters.age')}</p>
                    <MyAgeSelector
                        key={sliderKey}
                        className="w-full h-8"
                        defaultValue={selectedAge}
                        onChange={(value) => {
                            setSelectedAge(value);
                        }}
                    />
                </div>
                {/*Interests*/}
                <div className={'w-full rounded-3xl p-4 bg-telegram-secondary-bg'}>
                    <p className={'w-full mb-2 font-bold'}>{t('explore.filters.interests')}</p>
                    {isLoadingInterests ? (
                        <div className={'w-full flex justify-center'}>
                            <MyLoadingView />
                        </div>
                    ) : interests ? (
                        <MyTagsSelector
                            tags={interests}
                            selectedTags={selectedSearchInterests}
                            onSelectionChanged={(newSelection) => {
                                setSelectedSearchInterests(newSelection);
                            }}
                            defaultBackground={'bg-telegram-bg'}
                        />
                    ) : null}
                </div>
            </div>

            <MyButton
                isLoading={isLoading}
                onClick={() => {
                    if (isLoading) return;
                    setIsLoading(true);
                    const searchFilters = {
                        searchGenders: selectedSearchGenders,
                        searchInterests: selectedSearchInterests,
                        searchAgeFrom: selectedAge[0],
                        searchAgeTo: selectedAge[1]
                    };
                    new ProfileSetSearchFiltersRequest(searchFilters)
                        .call(sessionToken)
                        .then(({}) => {
                            setUser(
                                user
                                    ? {
                                          ...user,
                                          searchFilters
                                      }
                                    : undefined
                            );
                            router
                                .push(
                                    {
                                        pathname: '/explore'
                                    },
                                    '/explore',
                                    { shallow: true }
                                )
                                .then();
                        })
                        .catch((err) => {
                            console.log(err);
                            setIsLoading(false);
                        });
                }}
            >
                {t('profile.edit.edit')}
            </MyButton>
        </MyScrollableContainer>
    );
}
