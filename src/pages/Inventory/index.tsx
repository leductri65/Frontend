import { useChangeDocTitle } from '~/hooks';
import styles from './Inventory.module.scss';
import classNames from 'classnames/bind';
import route from './route';

const cx = classNames.bind(styles);

const TopMusic: React.FC = () => {
    useChangeDocTitle(route.HTMLTitle);
    return (
        <div>
            <h1>Tồn kho</h1>
        </div>
    );
};

export default TopMusic;
