import React from 'react';
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation';

interface Props {
    children: React.ReactNode;
}

// all the screens are using this component as the parent. it's our <main> tag.
export default function MainContainer({ children }: Props) {
    return <main className={'h-full flex flex-col items-center justify-around'}>{children}</main>;
}
