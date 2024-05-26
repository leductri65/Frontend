import { useChangeDocTitle } from '~/hooks';
import styles from './Bill.module.scss';
import classNames from 'classnames/bind';
import route from './route';

const cx = classNames.bind(styles);

const TopMusic: React.FC = () => {
    useChangeDocTitle(route.HTMLTitle);
    return (
        <div>
            <h1>Hóa đơn</h1>
        </div>
    );
};

export default TopMusic;
