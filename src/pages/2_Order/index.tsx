import { useChangeDocTitle } from '~/hooks';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import route from './route';
// import { AttributeBar } from '~/components';

const cx = classNames.bind(styles);

const TopMusic: React.FC = () => {
    useChangeDocTitle(route.HTMLTitle);
    return (
        <div>
            <h1>Đơn hàng</h1>
            {/* <AttributeBar attributes={['1', '2', '3']}></AttributeBar> */}
        </div>
    );
};

export default TopMusic;
