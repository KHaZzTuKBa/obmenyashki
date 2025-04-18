import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Icon } from '@/shared/ui/Icon';

import { sidebarItems } from '../config/sidebarItems';

import styles from './styles.module.scss';

export const Sidebar = () => {
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    useEffect(() => {
        const currentPath = location.pathname;
        const index = sidebarItems.findIndex((item) =>
            currentPath.startsWith(item.path)
        );
        setActiveIndex(index);
    }, [location.pathname]);

    const indicatorVars = useMemo(() => {
        const isActive = activeIndex !== -1;
        const desktopOffsetY = `calc((var(--sidebar-gap) + var(--sidebar-item-wh)) * ${activeIndex})`;

        const centerIndex = Math.floor(sidebarItems.length / 2);
        const mobileOffsetXMultiplier = isActive
            ? activeIndex - centerIndex
            : 0;
        const mobileOffsetX = `calc((var(--sidebar-item-wh) + var(--sidebar-gap)) * ${mobileOffsetXMultiplier})`;

        return {
            '--indicator-opacity': isActive ? 1 : 0,
            '--indicator-offset-y': desktopOffsetY,
            '--indicator-offset-x-relative': mobileOffsetX,
        } as React.CSSProperties;
    }, [activeIndex]);

    return (
        <nav className={styles.sidebar}>
            <ul className={styles.sidebar__menu} style={indicatorVars}>
                {sidebarItems.map((item) => (
                    <li key={item.id} className={styles.sidebar__item}>
                        <NavLink
                            to={item.path}
                            className={styles.sidebar__link}
                        >
                            <Icon
                                name={item.icon}
                                className={styles.sidebar__icon}
                            />
                        </NavLink>
                    </li>
                ))}
                <div className={styles.sidebar__indicator}></div>
            </ul>
        </nav>
    );
};
