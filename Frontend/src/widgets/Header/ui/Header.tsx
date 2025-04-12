import { SearchForm } from '@/features/header/search';
import { ProfileLink } from '@/features/header/profile-link';
import { Logo } from '@/shared/ui/Logo';

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
