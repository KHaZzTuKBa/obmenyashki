import { Header } from '@/widgets/Header';
import { Sidebar } from '@/widgets/Sidebar';
import { Outlet } from 'react-router-dom';
import style from './style.module.scss';

export const MainLayout = () => {
    return (
        <>
            <Header />
            <main className={style.main}>
                <Sidebar />
                <div className={style.content}>
                    <div className={style.content__layout}>
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    );
};
