import { ProfileProductSlider, ProfileUserCard } from '@/features/profile';

import { ProfileFeaturesCard } from './profile-features-card';

import style from './style.module.scss';

export const ProfilePage = () => {
    return (
        <section className={style.profile}>
            <ProfileUserCard />
            <ProfileFeaturesCard />
            <ProfileProductSlider />
        </section>
    );
};
