import CameraIconSvg from './assets/camera.svg?react';
import ChatIconSvg from './assets/chat.svg?react';
import GearIconSvg from './assets/gear.svg?react';
import GoodsIconSvg from './assets/goods.svg?react';
import HomeIconSvg from './assets/home.svg?react';
import PlantIconSvg from './assets/plant.svg?react';
import SearchIconSvg from './assets/search.svg?react';
import UserIconSvg from './assets/user.svg?react';

import style from './style.module.scss';

export type IconName =
    | 'search'
    | 'user'
    | 'home'
    | 'goods'
    | 'chat'
    | 'settings'
    | 'camera'
    | 'plant';

const iconsMap: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
    search: SearchIconSvg,
    user: UserIconSvg,
    home: HomeIconSvg,
    goods: GoodsIconSvg,
    chat: ChatIconSvg,
    settings: GearIconSvg,
    camera: CameraIconSvg,
    plant: PlantIconSvg,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    className?: string;
}

export const Icon = ({ name, className = '', ...rest }: IconProps) => {
    const SvgComponent = iconsMap[name];
    if (!SvgComponent) {
        return null;
    }
    return <SvgComponent className={`${style.icon} ${className}`} {...rest} />;
};
