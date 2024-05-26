import { forwardRef } from 'react';
import styles from './Partition.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type PartitionRowProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const PartitionRow: React.ForwardRefRenderFunction<HTMLDivElement, PartitionRowProps> = (
    { children, className, ...restProps },
    ref,
) => {
    return (
        <div className={`${cx('row')} ${className ? className : ''}`} {...restProps} ref={ref || null}>
            {children}
        </div>
    );
};

export default forwardRef(PartitionRow);
