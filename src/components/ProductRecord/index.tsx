// import styles from './AttributeBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
type TypeProductRecord = {
    attributes: Array<string>;
};

const ProductRecord: React.FC<TypeProductRecord> = ({ attributes }) => {
    return <div className={cx('wrapper')}></div>;
};

export default ProductRecord;
