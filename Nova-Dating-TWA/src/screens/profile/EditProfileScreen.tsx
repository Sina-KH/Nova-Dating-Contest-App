import { useSession } from '@/contexts/useSession';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MyButton from '@/components/Button/MyButton';
import MyTextField from '@/components/Field/MyTextField';
import MyEditPhoto from '@/components/Image/MyEditPhoto';
import { ProfileEditRequest } from '@/api/requests/profile/profileEditRequest';
import MyDateField from '@/components/Field/MyDateField';
import { hashToImageURL, ImagePresentationType } from '@/helpers/mediaHelpers';
import MyRadioSelect from '@/components/Select/MyRadioSelect';
import MyTagsSelector from '@/components/Select/MyTagsSelector';
import { ITag, ITagType } from '@/types/ITag';
import { TagListRequest } from '@/api/requests/tagListRequest';
import MyPhotoCropper from '@/components/Image/MyPhotoCropper';
import MyLoadingView from '@/components/Loading/MyLoadingView';
import MyScrollableContainer from '@/components/Containers/MyScrollableContainer';

export default function EditProfileScreen() {
    const { sessionToken, user, setUser } = useSession();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [birthdate, setBirthdate] = useState(user?.birthdate ? new Date(user.birthdate) : undefined);
    const [selectedImage, setSelectedImage] = useState<File | undefined>();
    const [selectedImagePreview, setSelectedImagePreview] = useState<string | undefined>(undefined);
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [selectedGender, setSelectedGender] = useState(user?.gender || '');
    const [isLoadingInterests, setIsLoadingInterests] = useState(true);
    const [interests, setInterests] = useState<ITag[] | null>(null);
    const [selectedInterests, setSelectedInterests] = useState<string[]>(
        user?.interests.map((it: Partial<ITag>) => it._id)
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
        <MyScrollableContainer className={'space-y-4'}>
            <div className={'w-full flex flex-row pb-4 items-center gap-2'}>
                <p className={'font-bold text-2xl flex-grow text-center'}>{t('profile.edit.title')}</p>
            </div>

            <div className={'w-full flex flex-col gap-4 items-center'}>
                {/*Profile image selector*/}
                <MyEditPhoto
                    defaultImage={
                        selectedImagePreview || hashToImageURL(user?.photo?.hash, ImagePresentationType.medium)
                    }
                    onImageSelect={(newImage) => {
                        setImageToCrop(newImage);
                    }}
                />
                <p className={'w-full'}>{t('profile.edit.basicInformation')}</p>
                {/*Firstname*/}
                <MyTextField
                    placeholder={t('profile.edit.firstName')}
                    value={firstName}
                    onValueChanged={(newValue) => {
                        setFirstName(newValue);
                    }}
                />
                {/*Lastname*/}
                <MyTextField
                    placeholder={t('profile.edit.lastName')}
                    value={lastName}
                    onValueChanged={(newValue) => {
                        setLastName(newValue);
                    }}
                />
                {/*Birthdate*/}
                <MyDateField
                    placeholder={t('profile.edit.birthdate')}
                    value={birthdate}
                    onValueChanged={(newValue) => {
                        setBirthdate(newValue);
                    }}
                />
                {/*Gender selection*/}
                <p className={'w-full pt-6'}>{t('profile.edit.gender')}</p>
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
                {/*Interests*/}
                <p className={'w-full pt-6'}>{t('profile.edit.gender')}</p>
                {isLoadingInterests ? (
                    <div className={'w-full flex justify-center'}>
                        <MyLoadingView />
                    </div>
                ) : interests ? (
                    <MyTagsSelector
                        tags={interests}
                        selectedTags={selectedInterests}
                        onSelectionChanged={(newSelection) => {
                            setSelectedInterests(newSelection);
                        }}
                    />
                ) : null}
            </div>

            <MyButton
                isLoading={isLoading}
                onClick={() => {
                    if (!birthdate || (!firstName?.length && !lastName?.length)) return;
                    if (!selectedGender.length || !selectedInterests.length) return;
                    if (isLoading) return;
                    setIsLoading(true);
                    new ProfileEditRequest({
                        firstName: firstName ?? '',
                        lastName: lastName ?? '',
                        birthdate: birthdate.toISOString(),
                        gender: selectedGender,
                        interests: selectedInterests.join(','),
                        photo: selectedImage
                    })
                        .call(sessionToken)
                        .then(({ user }) => {
                            console.log({ user });
                            setUser(user);
                            router
                                .push(
                                    {
                                        pathname: '/profile'
                                    },
                                    '/profile',
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
