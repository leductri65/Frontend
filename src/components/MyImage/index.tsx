import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './MyImage.module.scss';
import { useRef } from 'react';

import { useIntersectionObserver } from '~/hooks';
import { HTMLAttributes } from 'react';

const cx = classNames.bind(styles);

type IMyImage = HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
    link?: string | null;
    thumbnail: string;
    artistSpotlight?: boolean | null;
    album?: 'onlyDisk' | 'actionDisk' | null;
    weekChart?: boolean | null;
    event?: boolean | null;
};

const MyImage: React.FC<IMyImage> = ({
    link,
    thumbnail,
    artistSpotlight,
    album,
    weekChart,
    event,
    className,
    ...props
}) => {
    const wrapperImageEl = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(wrapperImageEl);

    const Tag = link ? Link : 'div';
    return (
        <div ref={wrapperImageEl} className={`${cx('wrapper')} ${className}`} {...props}>
            <div className={cx('image')} style={{ overflow: `${!album && 'hidden'}` }}>
                <Tag
                    to={link ? link : ''}
                    className={cx('figure', {
                        ['artist-banner']: artistSpotlight,
                        ['week-chart-banner']: weekChart,
                        ['event-banner']: event,
                    })}
                >
                    <img
                        src={entry?.isIntersecting ? thumbnail : ''}
                        className={cx('thumbnail', {
                            ['thumbnail-transition']: !album,
                            ['disk-transition']: album,
                            ['album']: album,
                        })}
                    />
                </Tag>
            </div>

            {album && entry?.isIntersecting && (
                <img src={require('~/assets/images/album__disk.png')} className={cx('disk', 'disk-transition')} />
            )}
        </div>
    );
};

export default MyImage;
