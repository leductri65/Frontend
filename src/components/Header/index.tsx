import classNames from 'classnames/bind';

import { MdArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';

import styles from './Header.module.scss';
import { Partition, MyButton, Search } from '..';
import PartitionCol from '../Partition/PartitionCol';
// import { useAppDispatch, useAppSelector, useResponsive } from '~/hooks';
// import { userSelector, userSlice } from '~/api/userSlice';
// import type { userTypeState } from '~/api/userSlice';
import asd from '~/assets/user_images/user-default.png';

const cx = classNames.bind(styles);

interface IHeaderProps {
    isScroll: boolean;
}

const isWindows = /Win/i.test(navigator.platform);

const Header: React.FC<IHeaderProps> = ({ isScroll }) => {
    // const dispatch = useAppDispatch();
    // const breakpoints = useResponsive('small');

    // const { isLogin, user }: userTypeState = useAppSelector(userSelector);

    // const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    //     dispatch(
    //         userSlice.actions.userLogin({
    //             info: {
    //                 name: 'le duc tri',
    //                 avatar: 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-1/287503586_1488219151635420_8687391544483386469_n.jpg?stp=c0.8.60.60a_cp0_dst-jpg_p60x60&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=J9d44-xpgS0AX9w3hIC&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfDStoxpxLFaW_Q0x_NjW2QfJoJmtpdzXdJt_P9O_dFZyg&oe=643AC944',
    //             },
    //             setting: { librarySetting: ['podcast'] },
    //         }),
    //     );
    // };

    return (
        <header
            className={cx('wrapper', {
                ['is-sticky']: isScroll,
            })}
        >
            <Partition>
                <PartitionCol prioritize style={{ marginRight: '10px' }}>
                    <MyButton className={cx('btn-header', 'btn-control')} isRounded variant="transparent">
                        <MdArrowBackIos />
                    </MyButton>

                    <MyButton className={cx('btn-header', 'btn-control')} isRounded variant="transparent">
                        <MdOutlineArrowForwardIos />
                    </MyButton>
                    <Search />
                </PartitionCol>

                <PartitionCol className={cx('right')}>
                    {/* <MyButton
                        isRounded
                        variant="secondary"
                        className={cx('btn-circle')}
                        tooltipProps={{ content: 'Nâng cấp VIP' }}
                        onClick={() => window.open('/update-vip', '_blank')}
                    >
                        <IoDiamondSharp />
                    </MyButton> */}

                    <MyButton
                        isRounded
                        variant="secondary"
                        className={cx('btn-header', 'btn-circle')}
                        tooltipProps={{ content: 'Cài đặt' }}
                    >
                        <FiSettings />
                    </MyButton>

                    <MyButton
                        variant="transparent"
                        isRounded
                        tooltipProps={{ content: 'Le Duc Tri' }}
                        className={cx('btn-header', 'btn-avatar')}
                    >
                        <img src={asd} />
                    </MyButton>
                </PartitionCol>
            </Partition>
        </header>
    );
};

export default Header;
