import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { logoutSession } from '@/entities/user/model';
import { Path } from '@/shared/config/routes';
import { Button } from '@/shared/ui/Form';

export const SettingsPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return (
        <Button
            color='grey'
            onClick={() => {
                logoutSession();
                queryClient.resetQueries();
                navigate(Path.LOGIN);
            }}
        >
            Exit
        </Button>
    );
};
