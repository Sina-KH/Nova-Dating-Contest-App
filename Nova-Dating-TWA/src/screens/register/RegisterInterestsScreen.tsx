import { useTranslation } from 'react-i18next';
import { useSession } from '@/contexts/useSession';
import MyButton from '@/components/Button/MyButton';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MyTitle from '@/components/Label/MyTitle';
import MySubTitle from '@/components/Label/MySubTitle';
import MyTagsSelector from '@/components/Select/MyTagsSelector';
import { TagListRequest } from '@/api/requests/tagListRequest';
import { ITag, ITagType } from '@/types/ITag';
import MyGrowingContainer from '@/components/Containers/MyGrowingContainer';
import { ProfileSetInterestsRequest } from '@/api/requests/profile/profileSetInterestsRequest';
import MyStepper from '@/components/Stepper/MyStepper';

export default function RegisterInterestsScreen() {
    const { sessionToken, setUser } = useSession();
    const { t } = useTranslation();
    const [interests, setInterests] = useState<ITag[] | null>(null);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        new TagListRequest({ type: ITagType.interests })
            .call(sessionToken)
            .then((response) => {
                setInterests(response?.tags ?? []);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [sessionToken]);

    return (
        <div className={'w-full h-full flex flex-col items-start space-y-4 pt-8 pb-8 pl-4 pr-4 overflow-y-auto'}>
            {/*Stepper*/}
            <MyStepper currentStep={3} steps={3} />
            <MyTitle>{t('register.interests.title')}</MyTitle>
            <MySubTitle>{t('register.interests.description')}</MySubTitle>
            <MyGrowingContainer>
                {interests ? (
                    <MyTagsSelector
                        tags={interests}
                        selectedTags={selectedInterests}
                        onSelectionChanged={(newSelection) => {
                            setSelectedInterests(newSelection);
                        }}
                    />
                ) : null}
            </MyGrowingContainer>
            <MyButton
                className={'mt-4'}
                disabled={!selectedInterests.length}
                isLoading={isLoading}
                onClick={() => {
                    if (!selectedInterests.length) return;
                    if (isLoading) return;
                    setIsLoading(true);
                    new ProfileSetInterestsRequest({ interests: selectedInterests })
                        .call(sessionToken)
                        .then(({ user }) => {
                            setUser(user);
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
                {t('register.interests.next')}
            </MyButton>{' '}
        </div>
    );
}
