import { Icon } from '@/shared/ui/Icon';

export const ProductImage = ({
    className = '',
    produtcImgURL = null,
}: {
    className?: string;
    produtcImgURL?: string | null;
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
                <Icon name='camera' className={className} />
            )}
        </>
    );
};
