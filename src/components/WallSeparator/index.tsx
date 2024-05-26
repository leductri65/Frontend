import styles from './WallSeparator.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type IWallSeparatorProps = React.HTMLAttributes<HTMLDivElement> & { [x: string]: any };

const WallSeparator: React.FC<IWallSeparatorProps> = ({ className, ...props }) => {
    return <div className={`${cx('wrapper')} ${className}`} {...props}></div>;
};

export default WallSeparator;
