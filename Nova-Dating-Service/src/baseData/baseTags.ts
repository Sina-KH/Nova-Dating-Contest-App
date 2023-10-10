import { ITagStatus, ITagType } from '@/models/tag';

export const baseTags = [
    {
        _id: 'i_party',
        type: ITagType.interests,
        names: {
            en: 'Party'
        },
        icon: '/assets/images/tags/i_party.png',
        status: ITagStatus.active
    },
    {
        _id: 'i_cats',
        type: ITagType.interests,
        names: {
            en: 'Cats'
        },
        icon: '/assets/images/tags/i_cats.png',
        status: ITagStatus.active
    },
    {
        _id: 'i_photography',
        type: ITagType.interests,
        names: {
            en: 'Photography'
        },
        icon: '/assets/images/tags/i_photography.png',
        status: ITagStatus.active
    },
    {
        _id: 'i_tennis',
        type: ITagType.interests,
        names: {
            en: 'Tennis'
        },
        icon: '/assets/images/tags/i_tennis.png',
        status: ITagStatus.active
    },
    {
        _id: 'i_bowling',
        type: ITagType.interests,
        names: {
            en: 'Bowling'
        },
        icon: '/assets/images/tags/i_bowling.png',
        status: ITagStatus.active
    },
    {
        _id: 'i_soccer',
        type: ITagType.interests,
        names: {
            en: 'Soccer'
        },
        icon: '/assets/images/tags/i_soccer.png',
        status: ITagStatus.active
    },
    {
        _id: 'i_gaming',
        type: ITagType.interests,
        names: {
            en: 'Gaming'
        },
        icon: '/assets/images/tags/i_gaming.png',
        status: ITagStatus.active
    }
];
