import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { logoutSession } from '@/entities/user';
import { Path } from '@/shared/config/routes';
import { Button } from '@/shared/ui/Form';

import style from './style.module.scss';

export const SettingsPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return (
        <div className={style.settings__wrapper}>
            <Button
                className={style.button__exit}
                color='purple'
                onClick={() => {
                    logoutSession();
                    queryClient.resetQueries();
                    navigate(Path.LOGIN);
                }}
            >
                Выйти из аккаунта
            </Button>
        </div>
    );
};
