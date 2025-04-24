import { Icon } from '@/shared/ui/Icon';

export const ProductImage = ({
    className = '',
    produtcImgURLs = [],
}: {
    className?: string;
    produtcImgURLs?: string[] ;
}) => {
    return (
        <>
            {produtcImgURLs.length > 0 ? (
                <img
                    src={produtcImgURLs[0]}
                    alt='Фото товара'
                    className={className}
                />
            ) : (
                <Icon name='camera' className={className} />
            )}
        </>
    );
};
