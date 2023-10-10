import { useSession } from '@/contexts/useSession';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MyTitle from '@/components/Label/MyTitle';
import MyGrowingContainer from '@/components/Containers/MyGrowingContainer';
import MyButton from '@/components/Button/MyButton';
import MyTextField from '@/components/Field/MyTextField';
import MyEditPhoto from '@/components/Image/MyEditPhoto';
import { ProfileEditRequest } from '@/api/requests/profile/profileEditRequest';
import MyDateField from '@/components/Field/MyDateField';
import { hashToImageURL, ImagePresentationType } from '@/helpers/mediaHelpers';
import MyStepper from '@/components/Stepper/MyStepper';
import MyPhotoCropper from '@/components/Image/MyPhotoCropper';

export default function RegisterProfileScreen() {
    const { sessionToken, user } = useSession();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [birthdate, setBirthdate] = useState(user?.birthdate ? new Date(user.birthdate) : undefined);
    const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
    const [selectedImagePreview, setSelectedImagePreview] = useState<string | undefined>(undefined);
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // cropper
    const [imageToCrop, setImageToCrop] = useState<Blob | undefined>(undefined);
    if (imageToCrop)
        return (
            <MyPhotoCropper
                selectedFile={imageToCrop}
                onCancel={() => {
                    setImageToCrop(undefined);
                }}
                onSubmit={(selectedImage) => {
                    setSelectedImage(selectedImage);
                    setImageToCrop(undefined);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setSelectedImagePreview(reader.result as string);
                    };
                    reader.readAsDataURL(selectedImage);
                }}
            />
        );

    return (
        <div className={'w-full h-full pt-8 pb-8 flex flex-col items-start space-y-4 pl-4 pr-4 overflow-y-auto'}>
            {/*Stepper*/}
            <MyStepper currentStep={1} steps={3} />

            <MyTitle>{t('register.profile.title')}</MyTitle>

            <MyGrowingContainer className={'flex flex-col gap-4 pb-4 items-center'}>
                {/*Profile image selector*/}
                <MyEditPhoto
                    defaultImage={
                        selectedImagePreview || hashToImageURL(user?.photo?.hash, ImagePresentationType.medium)
                    }
                    onImageSelect={(newImage) => {
                        setImageToCrop(newImage);
                    }}
                />
                {/*Firstname*/}
                <MyTextField
                    placeholder={t('register.profile.firstName')}
                    value={firstName}
                    onValueChanged={(newValue) => {
                        setFirstName(newValue);
                    }}
                />
                {/*Lastname*/}
                <MyTextField
                    placeholder={t('register.profile.lastName')}
                    value={lastName}
                    onValueChanged={(newValue) => {
                        setLastName(newValue);
                    }}
                />
                {/*Birthdate*/}
                <MyDateField
                    placeholder={t('register.profile.birthdate')}
                    value={birthdate}
                    onValueChanged={(newValue) => {
                        setBirthdate(newValue);
                    }}
                />
            </MyGrowingContainer>

            <MyButton
                disabled={
                    //(!user?.photo && !selectedImage) ||
                    !birthdate || (!firstName?.length && !lastName?.length)
                }
                isLoading={isLoading}
                onClick={() => {
                    if (
                        //(!user?.photo && !selectedImage) ||
                        !birthdate ||
                        (!firstName?.length && !lastName?.length)
                    )
                        return;
                    if (isLoading) return;
                    setIsLoading(true);
                    new ProfileEditRequest({
                        firstName: firstName ?? '',
                        lastName: lastName ?? '',
                        birthdate: birthdate.toISOString(),
                        photo: selectedImage
                    })
                        .call(sessionToken)
                        .then(() => {
                            router
                                .push(
                                    {
                                        pathname: '/register/gender'
                                    },
                                    '/register/gender',
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
                {t('register.profile.next')}
            </MyButton>
        </div>
    );
}
