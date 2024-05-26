import classNames from 'classnames/bind';
import { HTMLAttributes } from 'react';

import styles from './DescriptionText.module.scss';

const cx = classNames.bind(styles);

type DescriptionText = HTMLAttributes<HTMLSpanElement> & {
    children: React.ReactNode;
    line?: number | undefined;
};

const DescriptionText: React.FC<DescriptionText> = ({ children, style, line = 2, className, ...restProps }) => {
    return (
        <span
            className={`${cx('text')} ${className ? className : ''}`}
            style={{ WebkitLineClamp: `${line}`, ...style }}
            {...restProps}
        >
            {children}
        </span>
    );
};

export default DescriptionText;
