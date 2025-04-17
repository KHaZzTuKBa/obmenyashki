import { ProfileFeaturesCard } from './profile-features-card';
import { ProfileProductSlider } from '@/features/profile/profile-product-slider';
import { ProfileUserCard } from '@/features/profile/profile-user-card/ProfileUserCard';

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
