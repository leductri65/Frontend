import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './Logo.module.scss';
import { useAppSelector } from '~/hooks';
import { sidebarSelector } from '../SideBar/sidebarSlice';
// import { sidebarTypeState } from '~/types';

const cx = classNames.bind(styles);

interface ILogo {}

const Logo: React.FC<ILogo> = ({}) => {
    const navigate = useNavigate();

    const handleLogoClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        navigate('/');
    };

    // const { isShow }: sidebarTypeState = useAppSelector(sidebarSelector);

    return (
        <div
            className={cx('wrapper', {
                // ['is-expanded']: !isShow,
            })}
        >
            <button onClick={handleLogoClick}>
                <div className={cx('main')}></div>
            </button>
        </div>
    );
};

export default Logo;
