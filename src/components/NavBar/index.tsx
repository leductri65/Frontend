import { NavLink } from 'react-router-dom';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import styles from './NavBar.module.scss';
import classNames from 'classnames/bind';

import { MdOutlinePlayCircleOutline } from 'react-icons/md';

import { RouteType } from '~/types';
import { MyButton, Partition } from '..';
import PartitionCol from '../Partition/PartitionCol';
import { useAppSelector, useCheckScrollOSB } from '~/hooks';
import { sidebarSelector } from '../SideBar/sidebarSlice';

const cx = classNames.bind(styles);

type NavBarProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    routes: Array<RouteType>;
    isScroll?: boolean;
    activeItem?: boolean;
};

const NavBar: React.FC<NavBarProps> = ({
    children,
    routes,
    isScroll: wrapperScroll,
    className,
    activeItem = true,
    ...restProps
}) => {
    const Wrapper = wrapperScroll ? OverlayScrollbarsComponent : 'div';
    // Get state sidebar when screen medium size
    // const { isShow }: sidebarTypeState = useAppSelector(sidebarSelector);
    // Get size screen medium, medium, large
    // const { medium } = useResponsive('medium');

    // useCheckScrollOSB custom hook return isScroll, EventScroll
    const { isScroll, EventScroll } = useCheckScrollOSB();

    return (
        <Wrapper
            className={`${cx('wrapper', {
                // ['is-expanded']: isShow,
                ['mask']: isScroll,
            })} ${className}`}
            defer
            options={{
                scrollbars: { theme: 'os-theme-custom', autoHide: 'scroll', autoHideDelay: 2000 },
                overflow: { x: 'hidden' },
            }}
            events={{
                scroll: EventScroll,
            }}
            {...restProps}
        >
            {routes.map(({ path, logo: Logo, name }, index) => (
                <li key={index} className={cx('item')}>
                    <NavLink
                        to={path}
                        className={
                            activeItem
                                ? ({ isActive }) =>
                                      cx({
                                          ['is-active']: isActive,
                                      })
                                : undefined
                        }
                    >
                        <Partition>
                            <PartitionCol>{Logo && <Logo />}</PartitionCol>

                            <PartitionCol prioritize>
                                <span>{name}</span>
                            </PartitionCol>
                        </Partition>
                    </NavLink>
                </li>
            ))}
            {children}
        </Wrapper>
    );
};

export default NavBar;
