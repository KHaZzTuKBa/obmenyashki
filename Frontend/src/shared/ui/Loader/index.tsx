import { BounceLoader } from 'react-spinners';

import style from './style.module.scss';

type LoaderProps = React.ComponentProps<typeof BounceLoader> & {
    wrapperClassName?: string;
};

export const Loader = ({ wrapperClassName = '', ...props }: LoaderProps) => {
    return (
        <div className={`${style.loader__wrapper} ${wrapperClassName}`}>
            <BounceLoader color='#4DC5A5' size='6em' {...props} />
        </div>
    );
};
