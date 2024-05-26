import classNames from 'classnames/bind';
import styles from './FilterWithVariant.module.scss';
import { useEffect, useRef, useState } from 'react';
import MyButton from '../MyButton';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Partition } from '..';
import PartitionRow from '../Partition/PartitionRow';
import VariantsType from '~/types/variantsType';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '~/hooks';
import { menuFilterSlice } from '../MenuFilter/menuFilterSlice';

const cx = classNames.bind(styles);

type FilterWithVariantProps = {
    variants: Array<{
        name: string;
        variant: VariantsType;
    }>;
};

const FilterWithVariant: React.FC<FilterWithVariantProps> = ({ variants }) => {
    return (
        <div className={cx('wrapper')}>
            {variants.map((variant) => {
                return <FilterOptions key={variant.name} variantType={variant.name} variants={variant.variant} />;
            })}
        </div>
    );
};

type FilterOptionsProps = {
    variantType: string;
    variants: Array<{ name: string }>;
    initVariants?: Array<string>;
    action?: (variantSelected: string) => void;
};

export const FilterOptions: React.FC<FilterOptionsProps> = ({ variantType, variants, initVariants, action }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isActive, setIsActive] = useState<boolean>(false);

    const [variantsSelected, setVariantsSelected] = useState<Array<string>>(() => {
        if (initVariants) return initVariants;
        return searchParams.get(`variants_${variantType}`)?.split(',') ?? [];
    });

    const handleToggleSelect = (value: string) => {
        if (!variantsSelected.includes(value)) {
            const newValue = [...variantsSelected, value];

            !action &&
                setSearchParams((prev) => {
                    if (newValue.length === 0) prev.delete(`variants_${variantType}`);
                    else prev.set(`variants_${variantType}`, newValue.join(','));
                    return [...prev];
                });

            action && action(value);

            setVariantsSelected(newValue);
            return;
        }

        const newValue = [
            ...variantsSelected.filter((variantSelected) => {
                if (variantSelected === value) return false;
                return true;
            }),
        ];

        !action &&
            setSearchParams((prev) => {
                if (newValue.length === 0) prev.delete(`variants_${variantType}`);
                else prev.set(`variants_${variantType}`, newValue.join(','));
                return [...prev];
            });

        action && action(value);

        setVariantsSelected(newValue);
    };

    return (
        <Partition column className={cx('content')}>
            <PartitionRow
                className={cx('toggle_bar', {
                    active: isActive,
                })}
                onClick={(e) => setIsActive(!isActive)}
            >
                {variantType}
                <RiArrowRightSLine className={cx('arrow')} />
            </PartitionRow>
            {isActive && (
                <PartitionRow>
                    <div className={cx('options')}>
                        {variants.map((variant) => (
                            <MyButton
                                variant="secondary"
                                className={cx('item', {
                                    active: variantsSelected.includes(variant.name),
                                })}
                                key={variant.name}
                                onClick={(e) => handleToggleSelect(variant.name)}
                            >
                                {variant.name}
                            </MyButton>
                        ))}
                    </div>
                </PartitionRow>
            )}
        </Partition>
    );
};

export default FilterWithVariant;
