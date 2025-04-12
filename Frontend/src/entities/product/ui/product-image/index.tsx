import { Icon } from '@/shared/ui/Icon';

export const ProductImage = ({
    className = '',
    produtcImgURL,
}: {
    className?: string;
    produtcImgURL?: string;
}) => {
    return (
        <>
            {produtcImgURL ? (
                <img
                    src={produtcImgURL}
                    alt='Фото товара'
                    className={className}
                />
            ) : (
                <Icon name='search' className={className} />
            )}
        </>
    );
};
