import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getCurrentUser, setCurrentUser } from '@/entities/user';
import { getUser } from '@/entities/user/api';
import { ProfileProductSlider, ProfileUserCard } from '@/features/profile';

import { ProfileFeaturesCard } from './profile-features-card';

import style from './style.module.scss';

export const ProfilePage = () => {
    const user = getCurrentUser();

    const { data } = useQuery({
        queryKey: ['user', user?.id],
        queryFn: async () => {
            const response = await getUser(user);
            return response.data.user;
        },
        enabled: !!user?.id,
        refetchInterval: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (data) {
            setCurrentUser({ ...data });
        }
    }, [data]);

    return (
        <section className={style.profile}>
            <ProfileUserCard />
            <ProfileFeaturesCard />
            <ProfileProductSlider />
        </section>
    );
};
