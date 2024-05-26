import styles from './Partition.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type PartitionProps = React.HTMLAttributes<HTMLDivElement> & {
    column?: boolean;
    children: React.ReactNode;
};

const PartitionWrapper: React.FC<PartitionProps> = ({
    children,
    column = false,

    className,
    ...restProps
}) => {
    return (
        <div
            className={`${cx('wrapper', {
                ['wrapper-column']: column,
            })} ${className ? className : ''}`}
            {...restProps}
        >
            {children}
        </div>
    );
};

export default PartitionWrapper;
