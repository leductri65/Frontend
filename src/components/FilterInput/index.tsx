import { useEffect, useId, useRef, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import styles from './FilterInput.module.scss';
import classNames from 'classnames/bind';
import { Partition, Title } from '..';
import PartitionCol from '../Partition/PartitionCol';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { withMouseEventOutSide } from '~/HoCs';
import PartitionRow from '../Partition/PartitionRow';

const cx = classNames.bind(styles);

type IFilterInputProps = {
    position: number;
    attributes: Array<string>;
    inputKeyInit: string;
    inputValueInit: string;
    handleFilter: (position: number, key: string, value: string) => void;
};

const FilterInput: React.FC<IFilterInputProps> = ({
    position,
    handleFilter,
    attributes,
    inputKeyInit,
    inputValueInit,
}) => {
    const [inputKey, setInputKey] = useState<string>(inputKeyInit);
    const [inputValue, setInputValue] = useState<string>(inputValueInit);
    const [filterTable, setFilterTable] = useState<boolean>(false);
    const inputKeyEle = useRef<HTMLInputElement | null>(null);

    // const remainderAttribute = attributes.filter((attribute) => {
    //     if (attribute.includes(inputKey)) return attribute;
    // });

    const handleChangeInputKey: React.ChangeEventHandler<HTMLInputElement> = (e) => {};

    const handleChangeInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const valueInputValue: string = e.currentTarget.value;

        setInputValue(valueInputValue);
    };

    useEffect(() => {
        handleFilter(position, inputKey, inputValue);
    }, [inputKey, inputValue, position]);

    const RecommendListAddEventEscape = withMouseEventOutSide({
        parentNode: inputKeyEle.current!,
        executeFunction: () => {
            setFilterTable(false);
        },
    })(RecommendList);

    return (
        <Partition className={cx('wrapper-input')}>
            <PartitionCol style={{ width: '30%', position: 'relative' }} ref={inputKeyEle}>
                <input
                    onFocus={() => {
                        setFilterTable(true);
                    }}
                    className={cx('input', 'key')}
                    onChange={handleChangeInputKey}
                    value={inputKey}
                    spellCheck={false}
                />

                {filterTable && (
                    <RecommendListAddEventEscape>
                        <Partition column>
                            {attributes.map((item) => {
                                return (
                                    <PartitionRow
                                        key={item}
                                        onClick={(e) => {
                                            setInputKey(item);
                                            setFilterTable(false);
                                            e.stopPropagation();
                                        }}
                                        className={cx('filter_attribute')}
                                    >
                                        {item}
                                    </PartitionRow>
                                );
                            })}
                        </Partition>
                    </RecommendListAddEventEscape>
                )}
            </PartitionCol>
            <PartitionCol prioritize>
                <input
                    className={cx('input', 'value')}
                    value={inputValue}
                    onChange={handleChangeInputValue}
                    spellCheck={false}
                />
            </PartitionCol>
        </Partition>
    );
};

interface IRecommendList {
    children: React.ReactNode;
}

const RecommendList: React.FC<IRecommendList> = ({ children }) => {
    return (
        <div className={cx('key-filter-table')}>
            <OverlayScrollbarsComponent
                options={{
                    scrollbars: { theme: 'os-theme-custom', autoHide: 'scroll', autoHideDelay: 2000 },
                    overflow: { x: 'hidden' },
                }}
                defer
                className={cx('key-filter-table--content')}
                element="div"
            >
                {children}
            </OverlayScrollbarsComponent>
        </div>
    );
};

export default FilterInput;
