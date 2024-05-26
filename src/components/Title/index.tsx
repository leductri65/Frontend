import classNames from 'classnames/bind';
import { HTMLAttributes } from 'react';

import { Link } from 'react-router-dom';

import styles from './Title.module.scss';

const cx = classNames.bind(styles);

type ITitle = HTMLAttributes<HTMLElement> & {
    children: React.ReactNode;
    link?: string;
    homePageStyle?: boolean;
};

const Title: React.FC<ITitle> = ({ link, children, homePageStyle = false, className, ...restProps }) => {
    const Tag = link ? Link : 'h3';
    const propLink = link ? { to: link } : { to: '' };

    return (
        <Tag
            className={`${cx('text', { ['text-link']: link, ['homePage']: homePageStyle })} ${className}`}
            {...propLink}
            {...restProps}
        >
            {children}
        </Tag>
    );
};

export default Title;

// const Title: React.FC<ITitle> = ({ children }) => {
//     return <h3 className={cx('wrapper')}>{children}</h3>;
// };

// sx={{
//     padding: '5px',
//     color: 'var(--text-secondary)',
//     ['&:hover']: {
//         backgroundColor: 'transparent',
//         color: 'var(--link-text-hover)',
//     },
//     ['& svg']: {
//         marginLeft: '4px',
//     },
// }}
