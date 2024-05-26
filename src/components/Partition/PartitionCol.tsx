import { forwardRef } from 'react';
import styles from './Partition.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type PartitionColProps = React.HTMLAttributes<HTMLDivElement> & {
    prioritize?: boolean;
    children: React.ReactNode;
    hidden?: boolean;
};

const PartitionCol: React.ForwardRefRenderFunction<HTMLDivElement, PartitionColProps> = (
    { children, prioritize, hidden = false, className, ...restProps },
    ref,
) => {
    return (
        <div
            className={`${cx('col', {
                ['join']: prioritize,
                ['hidden']: hidden,
            })} ${className ? className : ''}`}
            {...restProps}
            ref={ref || null}
        >
            {children}
        </div>
    );
};

export default forwardRef(PartitionCol);
