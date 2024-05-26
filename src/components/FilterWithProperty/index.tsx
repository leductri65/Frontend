import classNames from 'classnames/bind';
import styles from './FilterWithProperty.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { MouseEventHandler, useEffect, useState } from 'react';
import { ConstraintsLengthArray } from '~/types';
import { FilterInput, MyButton, Partition } from '..';
import { RxCross1 } from 'react-icons/rx';
import PartitionCol from '../Partition/PartitionCol';

const cx = classNames.bind(styles);

type FilterWithPropertyProps = {
    propertiesList: Array<string>;
};

const FilterWithProperty: React.FC<FilterWithPropertyProps> = ({ propertiesList }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filterProperties, setFilterProperties] = useState<Array<[string, string]>>(() => {
        const searchParamsArray = [...searchParams];

        if (searchParamsArray.length <= 0) return [];

        const init: Array<ConstraintsLengthArray<string, 2>> = [];

        const searchFilters = searchParamsArray.reduce((result, param) => {
            if (propertiesList.includes(param[0])) result.push(param);
            return result;
        }, init);

        return searchFilters;
    });

    const handleNewFilter: MouseEventHandler<HTMLButtonElement> = (e) => {
        setFilterProperties((prevState) => [...prevState, ['', '']]);
    };

    const handleFilter = (position: number, key: string, value: string) => {
        if (!(filterProperties[position][0] === key && filterProperties[position][1] === value)) {
            const newState = [...filterProperties];
            newState[position] = [key, value];

            setFilterProperties(newState);

            setSearchParams((prev) => {
                if (value.length === 0) prev.delete(key);
                else prev.set(key, value);
                return [...prev];
            });
        }
    };

    const handleRemoveFilter = (position: number, key: string) => {
        const newFilterProperties = [...filterProperties];
        newFilterProperties.splice(position, 1);

        setFilterProperties(newFilterProperties);

        setSearchParams((prev) => {
            prev.delete(key);
            return [...prev];
        });
    };

    return (
        <div className={cx('wrapper')}>
            {filterProperties.map((filter, index) => {
                return (
                    <Partition key={`${filter[0]}_${index}`} className={cx('filter-row')}>
                        <PartitionCol>
                            <FilterInput
                                attributes={propertiesList.filter((property) => {
                                    if (
                                        filterProperties.find((filterProperty) => {
                                            if (filterProperty[0] === property) return filterProperty;
                                        })
                                    )
                                        return false;
                                    return true;
                                })}
                                inputKeyInit={filter[0]}
                                inputValueInit={filter[1]}
                                handleFilter={handleFilter}
                                position={index}
                            />
                        </PartitionCol>
                        <PartitionCol>
                            <MyButton
                                variant="transparent"
                                style={{
                                    color: 'red',
                                    marginLeft: '8px',
                                    fontSize: '1.125rem',
                                    borderRadius: '50%',
                                }}
                                onClick={(e) => {
                                    handleRemoveFilter(index, filter[0]);
                                    e.stopPropagation();
                                }}
                            >
                                <RxCross1 />
                            </MyButton>
                        </PartitionCol>
                    </Partition>
                );
            })}

            <MyButton style={{ padding: '8px', marginTop: '10px' }} onClick={handleNewFilter} variant="secondary">
                + thuộc tính mới
            </MyButton>
        </div>
    );
};

export default FilterWithProperty;
