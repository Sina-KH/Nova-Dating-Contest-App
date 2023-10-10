import { useTranslation } from 'react-i18next';
import { useSession } from '@/contexts/useSession';
import Image from 'next/image';
import MyButton from '@/components/Button/MyButton';
import MyRadioSelect from '@/components/Select/MyRadioSelect';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ProfileSetGenderRequest } from '@/api/requests/profile/profileSetGenderRequest';
import MyTitle from '@/components/Label/MyTitle';
import MyGrowingContainer from '@/components/Containers/MyGrowingContainer';
import MyStepper from '@/components/Stepper/MyStepper';

export default function RegisterGenderScreen() {
    const { sessionToken } = useSession();
    const { t } = useTranslation();
    const [selectedGender, setSelectedGender] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    return (
        <>
            <div className={'w-full h-full flex flex-col items-center space-y-10 pt-8 pb-8 pl-4 pr-4 overflow-y-auto'}>
                {/*Stepper*/}
                <MyStepper currentStep={2} steps={3} />

                <MyTitle>{t('register.gender.title')}</MyTitle>
                <MyGrowingContainer className={'pb-4'}>
                    <MyRadioSelect
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
                        selectedID={selectedGender}
                        onSelectionChanged={(selectedID: string) => {
                            setSelectedGender(selectedID);
                        }}
                    />
                </MyGrowingContainer>

                <MyButton
                    disabled={!selectedGender.length}
                    isLoading={isLoading}
                    onClick={() => {
                        if (!selectedGender.length) return;
                        if (isLoading) return;
                        setIsLoading(true);
                        new ProfileSetGenderRequest({ gender: selectedGender })
                            .call(sessionToken)
                            .then(() => {
                                router
                                    .push(
                                        {
                                            pathname: '/register/interests'
                                        },
                                        '/register/interests',
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
                    {t('register.gender.next')}
                </MyButton>
            </div>
        </>
    );
}
