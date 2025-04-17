import { SearchForm, ProfileLink } from '@/features/header';
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
