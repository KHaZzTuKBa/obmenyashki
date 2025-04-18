import { SearchForm } from '@/features/header';
import { Logo } from '@/shared/ui/Logo';

import { ProfileLink } from './profile-link/ProfileLink';

import style from './style.module.scss';

export const Header = () => {
    return (
        <header className={style.header}>
            <Logo />
            <SearchForm />
            <ProfileLink />
        </header>
    );
};
