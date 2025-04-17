import { ProductGrid } from '@/features/feed';

import style from './style.module.scss';

export const FeedPage = () => {
    return (
        <section className={style.market}>
            <ProductGrid />
        </section>
    );
};
