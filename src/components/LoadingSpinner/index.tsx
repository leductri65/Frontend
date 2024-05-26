import styles from './LoadingSpinner.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type LoadingSpinnerType = { [x: string]: string };

const LoadingSpinner: React.FC<LoadingSpinnerType> = () => {
    return (
        <div className={cx('wrapper')}>
            <svg className={cx('circular')} viewBox="25 25 50 50">
                <circle
                    className={cx('path')}
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                />
            </svg>
        </div>
    );
};

export default LoadingSpinner;
