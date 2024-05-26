import { Partition } from '..';
import PartitionCol from '../Partition/PartitionCol';
import Title from '../Title';
import styles from './NotFoundFilter.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type NotFoundFilterProps = {
    msg: string;
};

const NotFoundFilter: React.FC<NotFoundFilterProps> = ({ msg }) => {
    return (
        <Partition className={cx('wrapper')}>
            <PartitionCol>
                <div className={cx('logo')}></div>
            </PartitionCol>
            <PartitionCol>
                <Title style={{ fontSize: '1.25rem', cursor: 'default' }} className={cx('msg')}>
                    {msg}
                </Title>
            </PartitionCol>
        </Partition>
    );
};

export default NotFoundFilter;
