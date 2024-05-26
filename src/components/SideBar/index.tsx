import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

import { AiOutlinePlus } from 'react-icons/ai';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import { BsPencil } from 'react-icons/bs';

import { publicRoutes } from '../../pages';
// import myMusicRoute from '~/pages/MyMusic/route';

import { MyButton, Partition, Navbar, WallSeparator } from '..';
import { useAppDispatch, useAppSelector } from '~/hooks';

import { sidebarSelector, sidebarSlice } from './sidebarSlice';
// import { sidebarTypeState } from '~/types';
// import { userLoginSelector, userSettingSelector, userSlice } from '~/api';
import PartitionCol from '../Partition/PartitionCol';
// import ModalLayout from '../ModalLayout';
// import type { ModalLayoutRefProps } from '../ModalLayout';

const cx = classNames.bind(styles);
interface ISideBarProps {}

const publicRoutesOnSideBar = publicRoutes.filter((route) => {
    return route.navigateSideBar;
});

const SideBar: React.FC<ISideBarProps> = ({}) => {
    // const dispatch = useAppDispatch();

    // Get size screen small, medium, large
    // const breakpoints = useResponsive('medium');

    // Get state sidebar when breakpoints is small (true is open false is close)
    // const { isShow }: sidebarTypeState = useAppSelector(sidebarSelector);

    // Get state user login or not
    // const isLogin: boolean = useAppSelector(userLoginSelector);

    // Get user library setting
    // const { librarySetting } = useAppSelector(userSettingSelector);

    // const handleLogin: React.MouseEventHandler<HTMLDivElement> = (e) => {
    //     dispatch(
    //         userSlice.actions.userLogin({
    //             info: {
    //                 name: 'le duc tri',
    //                 avatar: 'https://files.ocula.com/anzax/72/72d7c707-e5c1-4cbf-84c3-7db2b556caa7_447_650.jpg',
    //             },
    //             setting: { librarySetting: [] },
    //         }),
    //     );
    // };

    // const handleClickShowSidebar: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    //     dispatch(sidebarSlice.actions.toggleShow());
    // };

    // useEffect(() => {
    //     dispatch(sidebarSlice.actions.hideSidebar());
    // }, [breakpoints.medium]);

    // const myRef = useRef<ModalLayoutRefProps>(null);

    // useEffect(() => {}, [myRef.current]);

    return (
        <div
            className={cx('wrapper', {
                // ['pulled']: isShow,
            })}
        >
            <Partition column style={{ alignItems: 'unset', marginTop: '20px' }}>
                <Navbar routes={publicRoutesOnSideBar.slice(0, 4)} className={cx('navbar-main')}></Navbar>

                <WallSeparator className={cx('wall-separator')} />

                <Navbar
                    isScroll
                    routes={publicRoutesOnSideBar.slice(4)}
                    className={cx('navbar')}
                    style={{ paddingTop: '10px' }}
                ></Navbar>
            </Partition>
        </div>
    );
};

export default SideBar;
