import { useAppDispatch, useAppSelector, useChangeDocTitle, useGetDataRedux } from '~/hooks';
import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import route from './route';
import { ProductPageDataType, dataProductPageSelector, getAllProduct } from './productDataSlice';
import { DescriptionText, LoadingSpinner, MyButton, Partition, Title } from '~/components';
import PartitionCol from '~/components/Partition/PartitionCol';
import PartitionRow from '~/components/Partition/PartitionRow';
import imggg from '~/assets/images/product-default.png';
import MyImage from '~/components/MyImage';
import { BsThreeDots } from 'react-icons/bs';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import FilterButton from '~/components/FilterButton';
import { productAttributes } from '~/types/Product.Type';

import { useEffect } from 'react';
import { getProductFilters } from './productFilterSlice';

const cx = classNames.bind(styles);

const ProductPage: React.FC = () => {
    useChangeDocTitle(route.HTMLTitle);
    const { search } = useLocation();

    const dispatch = useAppDispatch();

    const { data, status }: ProductPageDataType | undefined = useAppSelector(dataProductPageSelector);

    useEffect(() => {
        const debounceQuery = setTimeout(() => {
            dispatch(getAllProduct(search));
        }, 300);
        return () => clearTimeout(debounceQuery);
    }, [search]);

    useEffect(() => {
        dispatch(getProductFilters());
    }, []);

    const navigate = useNavigate();
    const openProduct = (id: string) => {
        navigate(`${id}`);
    };

    if (status === 'error') return <h1>Error!</h1>;

    return (
        <div className={cx('wrapper')}>
            <FilterButton attributes={productAttributes}></FilterButton>
            {status === 'loading' && <LoadingSpinner />}
            {data.data.length > 0 &&
                data.data.map((product) => {
                    return (
                        <div
                            className={cx('product-card')}
                            key={product.id}
                            onClick={() => {
                                openProduct(product.id);
                            }}
                        >
                            <Partition className={cx('main')}>
                                <PartitionCol className={cx('left')}>
                                    <MyImage
                                        style={{ width: '64px' }}
                                        thumbnail={product.image ? `data:image/jpeg;base64,${product.image}` : imggg}
                                    />
                                </PartitionCol>
                                <PartitionCol prioritize className={cx('center')}>
                                    <Partition column>
                                        <PartitionRow style={{ marginBottom: '4px' }}>
                                            <Title>{product.name}</Title>
                                        </PartitionRow>
                                        <PartitionRow style={{ marginBottom: '4px' }}>
                                            <DescriptionText>
                                                Giá:
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(product.price as unknown as number)}
                                            </DescriptionText>
                                        </PartitionRow>
                                        <PartitionRow>
                                            <Partition className={cx('variant-wrapper')}>
                                                {product.variants &&
                                                    product.variants.map((variant) => {
                                                        return (
                                                            <PartitionCol
                                                                key={variant.name}
                                                                className={cx('variant', {
                                                                    [variant.belongs_to_type]: true,
                                                                })}
                                                            >
                                                                <span>{variant.name.toUpperCase()}</span>
                                                            </PartitionCol>
                                                        );
                                                    })}
                                            </Partition>
                                        </PartitionRow>
                                    </Partition>
                                </PartitionCol>
                                <PartitionCol className={cx('right')}>
                                    <MyButton
                                        variant={'transparent'}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <BsThreeDots />
                                    </MyButton>
                                </PartitionCol>
                            </Partition>
                        </div>
                    );
                })}
        </div>
    );
};

export default ProductPage;
