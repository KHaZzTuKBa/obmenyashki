import ChatIconSvg from './assets/chat.svg?react';
import GearIconSvg from './assets/gear.svg?react';
import GoodsIconSvg from './assets/goods.svg?react';
import HomeIconSvg from './assets/home.svg?react';
import SearchIconSvg from './assets/search.svg?react';
import UserIconSvg from './assets/user.svg?react';

// TODO: Подключить базовые стили

export type IconName =
    | 'search'
    | 'user'
    | 'home'
    | 'goods'
    | 'chat'
    | 'settings';

const iconsMap: Record<
    IconName,
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
    search: SearchIconSvg,
    user: UserIconSvg,
    home: HomeIconSvg,
    goods: GoodsIconSvg,
    chat: ChatIconSvg,
    settings: GearIconSvg,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    className?: string;
}

export const Icon = ({ name, className, ...rest }: IconProps) => {
    const SvgComponent = iconsMap[name];
    if (!SvgComponent) {
        return null;
    }
    return <SvgComponent className={className} {...rest} />;
};
