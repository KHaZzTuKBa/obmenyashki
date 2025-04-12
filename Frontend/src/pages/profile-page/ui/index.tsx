import { ProfileFeaturesCard } from './profile-features-card';
import { ProfileProductSlider } from './profile-product-slider';
import { ProfileUserCard } from './profile-user-card';

import style from './style.module.scss';

export const ProfilePage = () => {
    return (
        <div className={style.profile}>
            <ProfileUserCard />
            <ProfileFeaturesCard />
            <ProfileProductSlider />
        </div>
    );
};
