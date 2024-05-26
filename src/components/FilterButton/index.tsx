import classNames from 'classnames/bind';
import styles from './FilterButton.module.scss';

import { MyButton } from '..';
import { FaFilter } from 'react-icons/fa';
import { useAppDispatch } from '~/hooks';
import { menuModalSlice } from '../MenuModal/MenuModalSlice';

const cx = classNames.bind(styles);

type IFilterProps = {
    attributes: Array<string>;
};

const FilterButton: React.FunctionComponent<IFilterProps> = ({ attributes }) => {
    const dispatch = useAppDispatch();

    return (
        <MyButton
            tooltipProps={{ content: 'Lọc', placement: 'right' }}
            variant="secondary"
            className={cx('btn-filter')}
            isRounded
            onClick={(e) => {
                dispatch(
                    menuModalSlice.actions.openTable({
                        x: e.clientX,
                        y: e.clientY,
                        menuType: 'filter',
                    }),
                );
                e.stopPropagation();
            }}
        >
            <FaFilter />
        </MyButton>
    );
};

export default FilterButton;
