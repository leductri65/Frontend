import styles from './Layout.module.scss';
import { Header, Sidebar, Container, Logo, MenuModal } from '..';

import classNames from 'classnames/bind';
import { useState } from 'react';
import type { OverlayScrollbars } from 'overlayscrollbars';

// import { useAppDispatch, useAppSelector } from '../../hooks';
// useCheckScrollOSB, useResponsive
// import { menuCardSelector, menuCardSlice } from '../MenuCard/MenuCardSlice';

const cx = classNames.bind(styles);

type ILayoutProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    isHeader?: boolean;
    isSidebar?: boolean;
};

const Layout: React.FC<ILayoutProps> = ({ children, isHeader = true, isSidebar = true, ...restProps }) => {
    // const dispatch = useAppDispatch();

    // const menuCarousel = useAppSelector(menuCardSelector);
    const [isScroll, setIsScroll] = useState<boolean>(false);

    const handleEventScroll = (e: OverlayScrollbars) => {
        // if (menuCarousel.x !== 0) {
        //     dispatch(menuCardSlice.actions.closeTable());
        // }
        if (e.elements().scrollOffsetElement.scrollTop > 0 && isScroll === false) {
            setIsScroll(true);
        }
        if (e.elements().scrollOffsetElement.scrollTop === 0) {
            setIsScroll(false);
        }
    };

    return (
        <div className={cx('wrapper')} {...restProps}>
            <Logo />
            {isHeader && <Header isScroll={isScroll} />}

            {isSidebar && <Sidebar />}

            <Container scrollEvent={handleEventScroll}>{children}</Container>
            <MenuModal />
        </div>
    );
};

export default Layout;
