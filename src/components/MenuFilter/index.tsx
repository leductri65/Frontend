import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { FilterWithProperty, MyButton, Partition, Title } from '..';

import styles from './MenuFilter.module.scss';
import classNames from 'classnames/bind';

import PartitionRow from '../Partition/PartitionRow';
import InputRange from '../InputRange';
import { useAppSelector } from '~/hooks';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterWithVariant from '../FilterWithVariant';
import { ProductFilterType, productFiltersSelector } from '~/pages/Product/productFilterSlice';

const cx = classNames.bind(styles);
type MenuFilterProps = {};

const MenuFilter: React.FC<MenuFilterProps> = ({}) => {
    const productFilters: ProductFilterType = useAppSelector(productFiltersSelector);

    const [searchParams, setSearchParams] = useSearchParams();

    const [reMount, setReMount] = useState<boolean>(false);

    if (productFilters.status === 'initial') return null;

    return (
        <OverlayScrollbarsComponent
            defer
            options={{
                scrollbars: { theme: 'os-theme-custom', autoHide: 'scroll', autoHideDelay: 2000 },
                overflow: { x: 'hidden' },
            }}
            className={cx('wrapper')}
        >
            <MyButton
                variant="secondary"
                className={cx('btn-clear-search')}
                onClick={() => {
                    setReMount(!reMount);
                    setSearchParams([]);
                }}
            >
                Tìm kiếm mới
            </MyButton>
            <Partition key={`${reMount}`} column className={cx('content')}>
                <PartitionRow>
                    <Title className={cx('title_filter')}>Lọc Tìm Kiếm</Title>
                </PartitionRow>

                <PartitionRow>
                    <Title className={cx('title_filter')} style={{ fontSize: '0.875rem' }}>
                        Khoảng giá
                    </Title>
                </PartitionRow>

                {/* Range price filter  */}
                <PartitionRow>
                    <InputRange maxRange={productFilters.productFilters.maxPrice} />
                </PartitionRow>

                <PartitionRow>
                    <Title className={cx('title_filter')} style={{ fontSize: '0.875rem' }}>
                        Theo loại
                    </Title>
                </PartitionRow>

                {/* Variant filter */}
                <PartitionRow>
                    <FilterWithVariant variants={productFilters.productFilters.variantsFilter} />
                </PartitionRow>

                <PartitionRow>
                    <Title className={cx('title_filter')} style={{ fontSize: '0.875rem' }}>
                        Theo thuộc tính
                    </Title>
                </PartitionRow>

                {/* Product attributes filter */}
                <PartitionRow>
                    <FilterWithProperty propertiesList={productFilters.productFilters.attributesFilter} />
                </PartitionRow>
            </Partition>
        </OverlayScrollbarsComponent>
    );
};

export default MenuFilter;
