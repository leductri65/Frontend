import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import {
    ChangeEventHandler,
    FocusEventHandler,
    KeyboardEventHandler,
    MouseEventHandler,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useChangeDocTitle } from '~/hooks';
import { getProductById, getProductByIdSelector, productDetailsSlice, updateProductById } from './productDetailsSlice';
import { DataInput, DescriptionText, MyButton, Partition, Title } from '~/components';
import PartitionCol from '~/components/Partition/PartitionCol';
import PartitionRow from '~/components/Partition/PartitionRow';
import imggg from '~/assets/images/product-default.png';

import { RxCross2 } from 'react-icons/rx';
import { ProductType } from '~/types';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineCheck } from 'react-icons/ai';
import MyImage from '~/components/MyImage';
import { FilterOptions } from '~/components/FilterWithVariant';
import { VariantsType } from '~/types';
import { IoMdRefresh } from 'react-icons/io';

const cx = classNames.bind(styles);
type ProductDetailsProps = {};

const renderDataInputs = (args: {
    modelData: { [x: string]: unknown };
    attrsRender: Array<string>;
    cb: (valueInput: unknown, labelValue: string) => void;
}) =>
    args.attrsRender.map((attr) => {
        if (!(args.modelData[attr] && ['string', 'number'].includes(typeof args.modelData[attr]))) return null;

        return (
            <DataInput
                className="mb-2.5"
                key={attr}
                currentValue={`${args.modelData[attr] ?? ''}`}
                labelValue={attr}
                cb={args.cb}
            />
        );
    });

const ProductDetails: React.FC<ProductDetailsProps> = ({}) => {
    const dispatch = useAppDispatch();
    const { productId } = useParams();
    useChangeDocTitle(productId);
    const { status, data } = useAppSelector(getProductByIdSelector);

    const [productVariants, setProductVariants] = useState<
        Array<{
            name: string;
            variant: VariantsType;
        }>
    >([]);
    const [productsIvt, setProductsIvt] = useState<
        Array<{ id: number; quantity: number; status: string; product_id: string; store_name: string }>
    >([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/variant`, {
            method: 'GET',
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setProductVariants(data.data);
            });

        fetch(`http://127.0.0.1:8000/api/v1/inventory?product_id=${productId}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setProductsIvt(data.data);
            });
    }, []);

    useEffect(() => {
        if (!productId) {
            //throw Error
            return;
        }
        dispatch(getProductById(productId));

        return () => {
            dispatch(productDetailsSlice.actions.clearData());
        };
    }, []);

    if (status === 'notFound') return <Title link="/product">Product not found with ID: {productId}</Title>;
    if (!data || !productId) return null;

    const dispatchUpdateProduct = (attribute: string, value: unknown) => {
        dispatch(
            updateProductById({
                productId: productId,
                data: { [attribute]: value },
            }),
        );
    };

    const variants = data.variants;

    return (
        <div className={cx('wrapper')}>
            <Partition style={{ alignItems: 'flex-start' }}>
                <PartitionCol prioritize>
                    <Partition column>
                        <PartitionRow>
                            <Partition>
                                <PartitionCol prioritize style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <h4
                                        style={{
                                            fontSize: '1rem',
                                            cursor: 'default',
                                            fontWeight: 'normal',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        ID sản phẩm: {data.id}
                                    </h4>
                                    <DataInput
                                        labelValue="name"
                                        currentValue={`${data.name}`}
                                        cb={(value) => {
                                            dispatchUpdateProduct('name', value);
                                        }}
                                        isWrap
                                        InputAttrs={{ className: '!text-3xl mt-2.5' }}
                                    />
                                </PartitionCol>
                                <PartitionCol>
                                    {/* Image */}
                                    <input
                                        type="file"
                                        id="a"
                                        onChange={(e) => {
                                            const formData = new FormData();
                                            formData.append('image', e.target.files[0]);

                                            fetch(`http://127.0.0.1:8000/api/v1/product/${productId}`, {
                                                method: 'PATCH',
                                                body: formData,
                                                keepalive: true,
                                            }).then((r) => {
                                                dispatch(getProductById(productId));
                                                return;
                                            });
                                            e.preventDefault();
                                        }}
                                        accept=".jpg"
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="a">
                                        <MyImage
                                            style={{ width: '150px' }}
                                            thumbnail={data.image ? `data:image/jpeg;base64,${data.image}` : imggg}
                                        />
                                    </label>
                                </PartitionCol>
                            </Partition>
                        </PartitionRow>
                        <PartitionRow>
                            <h3 className={cx('title')}>Thông tin chung:</h3>
                        </PartitionRow>
                        <PartitionRow>
                            <DataInput
                                className="mb-2.5"
                                labelValue="price"
                                currentValue={`${data.price}`}
                                cb={(value, attribute) => {
                                    dispatchUpdateProduct(attribute, value);
                                }}
                                InputAttrs={{ className: '!text-xl  mt-1' }}
                                isWrap
                                isPrice
                            />
                        </PartitionRow>
                        <PartitionRow>
                            <Partition style={{ alignItems: 'flex-start' }}>
                                <PartitionCol
                                    style={{ width: '100%', flexDirection: 'column', alignItems: 'flex-start' }}
                                >
                                    {renderDataInputs({
                                        modelData: data,
                                        attrsRender: ['brand', 'weight', 'length', 'width', 'height'],
                                        cb: (value, labelValue) => {
                                            dispatchUpdateProduct(labelValue, value);
                                        },
                                    })}
                                </PartitionCol>
                                <PartitionCol
                                    style={{ width: '100%', flexDirection: 'column', alignItems: 'flex-start' }}
                                >
                                    {renderDataInputs({
                                        modelData: data,
                                        attrsRender: ['barcode'],
                                        cb: (value, labelValue) => {
                                            dispatchUpdateProduct(labelValue, value);
                                        },
                                    })}
                                </PartitionCol>
                            </Partition>
                        </PartitionRow>
                        <PartitionRow>
                            <DataInput
                                currentValue={`${data.description}`}
                                labelValue={'description'}
                                isTextarea
                                cb={(value) => {
                                    dispatchUpdateProduct('description', value);
                                }}
                                isWrap
                                className="w-full"
                                InputAttrs={{ className: 'min-h-40 mt-2.5' }}
                            />
                        </PartitionRow>
                        <PartitionRow>
                            <h3 className={cx('title')}>Phân loại cho sản phẩm:</h3>
                        </PartitionRow>
                        <PartitionRow>
                            <Partition column style={{ marginBottom: '15px' }}>
                                {productVariants.map((variant) => {
                                    return (
                                        <PartitionRow key={variant.name}>
                                            <FilterOptions
                                                variantType={variant.name}
                                                variants={variant.variant}
                                                initVariants={variants
                                                    .filter((item) => item.belongs_to_type === variant.name)
                                                    .map((item) => item.name)}
                                                action={(variantSelected: string) => {
                                                    fetch(
                                                        `http://127.0.0.1:8000/api/v1/product/${productId}/variants`,
                                                        {
                                                            method: 'PATCH',
                                                            headers: {
                                                                'Content-Type': 'application/json; charset=utf-8',
                                                            },
                                                            body: JSON.stringify({
                                                                variantName: variantSelected,
                                                            }),
                                                            keepalive: true,
                                                        },
                                                    );
                                                }}
                                            />
                                        </PartitionRow>
                                    );
                                })}
                            </Partition>
                        </PartitionRow>
                        <PartitionRow>
                            <h3 className={cx('title')}>Các thông tin bổ sung khác:</h3>
                        </PartitionRow>
                        <PartitionRow style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <CustomFields customFields={data.custom_fields} />
                        </PartitionRow>
                    </Partition>
                </PartitionCol>
                <PartitionCol className={cx('inventory-wrap')}>
                    <Partition column>
                        <PartitionRow>
                            <h3 className={cx('title')}>Tồn kho:</h3>
                            <MyButton
                                style={{ padding: '8px', borderRadius: '999px', fontSize: '1.125rem' }}
                                variant="secondary"
                                onClick={(e) => {
                                    fetch(`http://127.0.0.1:8000/api/v1/inventory?product_id=${productId}`, {
                                        method: 'GET',
                                    })
                                        .then((res) => {
                                            return res.json();
                                        })
                                        .then((data) => {
                                            setProductsIvt(data.data);
                                        });
                                }}
                            >
                                <IoMdRefresh />
                            </MyButton>
                        </PartitionRow>
                        {productsIvt.map((productIvt) => {
                            return (
                                <PartitionRow
                                    className={cx('inventory-item', `${productIvt.status}`)}
                                    key={productIvt.store_name}
                                >
                                    <Title>Chi nhánh: {productIvt.store_name}</Title>
                                    <DescriptionText>Số lượng: {productIvt.quantity}</DescriptionText>
                                    <DescriptionText>Tình trạng: {productIvt.status}</DescriptionText>
                                </PartitionRow>
                            );
                        })}
                        <PartitionRow>
                            <MyButton style={{ padding: '10px', width: '100%' }} variant="secondary">
                                Nhập hàng
                            </MyButton>
                        </PartitionRow>
                    </Partition>
                </PartitionCol>
            </Partition>
        </div>
    );
};

type CustomFieldsType = {
    customFields: { [x: string]: string };
};
const CustomFields: React.FC<CustomFieldsType> = ({ customFields }) => {
    const dispatch = useAppDispatch();
    const { productId } = useParams();
    const [fields, setFields] = useState<{ [x: string]: string }>(customFields);
    const [newFields, setNewFields] = useState<{ key: string; value: string } | null>(null);

    const action = (keyField: string, valueField: string) => {
        setFields((prev) => {
            const newValue = Object.assign({}, prev);
            newValue[keyField] = valueField;

            return newValue;
        });
    };

    const handleAddField: MouseEventHandler<HTMLButtonElement> = () => {
        setNewFields({ key: '', value: '' });
    };

    const handleRemoveField = (keyField: string) => {
        setFields((prev) => {
            const newValue = Object.assign({}, prev);
            delete newValue[keyField];
            return newValue;
        });
    };

    useEffect(() => {
        dispatch(
            updateProductById({
                productId: productId as string,
                data: {
                    custom_fields: fields,
                },
            }),
        );
    }, [fields]);

    return (
        <div>
            {Object.keys(fields ?? {}).map((customAttribute) => {
                return (
                    <Partition style={{ marginBottom: '10px' }} key={customAttribute}>
                        <MyButton
                            onClick={(e) => handleRemoveField(customAttribute)}
                            style={{
                                padding: '5px',
                                fontSize: '1.125rem',
                                color: 'red',
                            }}
                            variant="transparent"
                        >
                            <RxCross2 />
                        </MyButton>
                        <DataInput
                            currentValue={`${fields[customAttribute]}`}
                            labelValue={customAttribute}
                            cb={(value, attr) => {
                                action(attr, value as string);
                            }}
                        />
                    </Partition>
                );
            })}
            {newFields && (
                <Partition>
                    <PartitionCol>
                        <div className={cx('input-wrap')} style={{ marginRight: '10px' }}>
                            <input
                                className={cx('input', {
                                    error: newFields.key.length === 0 || fields[newFields.key],
                                })}
                                placeholder="Type"
                                value={newFields?.key}
                                onChange={(e) => {
                                    setNewFields((prev) => {
                                        return { ...prev, key: e.target.value } as any;
                                    });
                                }}
                            />
                            <span />
                        </div>
                    </PartitionCol>

                    <PartitionCol prioritize style={{ width: '80%' }}>
                        <div className={cx('input-wrap')}>
                            <input
                                className={cx('input', {
                                    error: newFields.value.length === 0,
                                })}
                                placeholder="Value"
                                value={newFields?.value}
                                onChange={(e) => {
                                    setNewFields((prev) => {
                                        return { ...prev, value: e.target.value } as any;
                                    });
                                }}
                            />
                            <span />
                        </div>
                    </PartitionCol>
                    <PartitionCol>
                        <MyButton
                            variant="transparent"
                            className={cx('btn')}
                            style={{ color: 'green' }}
                            onClick={(e) => {
                                if (newFields.key.length === 0 || newFields.value.length === 0 || fields[newFields.key])
                                    return;
                                action(newFields.key, newFields.value);
                                setNewFields(null);
                            }}
                        >
                            <AiOutlineCheck />
                        </MyButton>
                    </PartitionCol>
                    <PartitionCol>
                        <MyButton
                            variant="transparent"
                            className={cx('btn')}
                            style={{ color: 'red' }}
                            onClick={(e) => setNewFields(null)}
                        >
                            <RxCross2 />
                        </MyButton>
                    </PartitionCol>
                </Partition>
            )}
            {!newFields && (
                <MyButton
                    onClick={handleAddField}
                    style={{
                        padding: '5px 0',
                        width: '100%',
                        minWidth: '150px',
                        color: 'var(--text-white)',
                        fontSize: '1.125rem',
                    }}
                    variant="secondary"
                >
                    <FaPlus />
                </MyButton>
            )}
        </div>
    );
};

export default ProductDetails;
