import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import type { OverlayScrollbars } from 'overlayscrollbars';
import styles from './Container.module.scss';

import classNames from 'classnames/bind';
import { Suspense } from 'react';
import { LoadingSpinner } from '..';

const cx = classNames.bind(styles);

type IContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    scrollEvent: (e: OverlayScrollbars) => void;
};

const Container: React.FC<IContainerProps> = ({ children, scrollEvent, ...restProps }) => {
    return (
        <div className={cx('wrapper')} {...restProps}>
            <div className={cx('envelop')}>
                <OverlayScrollbarsComponent
                    defer
                    options={{
                        scrollbars: { theme: 'os-theme-custom', autoHide: 'scroll', autoHideDelay: 2000 },
                        overflow: { x: 'hidden' },
                    }}
                    element="main"
                    className={cx('main')}
                    events={{
                        scroll: scrollEvent,
                    }}
                >
                    <div className={cx('content')}>
                        <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
                    </div>
                </OverlayScrollbarsComponent>
            </div>
        </div>
    );
};

export default Container;
