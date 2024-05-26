import classNames from 'classnames/bind';
import styles from './InputRange.module.scss';
import Partition from '../Partition';
import PartitionRow from '../Partition/PartitionRow';
import { useEffect, useRef, useState } from 'react';
import DescriptionText from '../DescriptionText';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '~/hooks';
import { menuFilterSlice } from '../MenuFilter/menuFilterSlice';

const cx = classNames.bind(styles);
const percentCalculate = (number: number, percent: number) => {
    return Math.round((number * parseFloat(percent.toFixed(1))) / 100);
};

type InputRangeProps = {
    maxRange: number;
};

const InputRange: React.FC<InputRangeProps> = ({ maxRange }) => {
    // const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [isDragMinPrice, setIsDragMinPrice] = useState<boolean>(false);
    const [isDragMaxPrice, setIsDragMaxPrice] = useState<boolean>(false);

    const [dotMin, setDotMin] = useState<number>(() => {
        const currentPriceSearch = searchParams.get('price');

        if (!currentPriceSearch) return 0;

        const price = currentPriceSearch.split('-');

        if (price.length > 1) {
            return (parseInt(price[0]) * 100) / maxRange;
        }

        return 0;
    });

    const [dotMax, setDotMax] = useState<number>(() => {
        const currentPriceSearch = searchParams.get('price');

        if (!currentPriceSearch) return 100;

        const price = currentPriceSearch.split('-');

        if (price.length > 1) {
            return (parseInt(price[1]) * 100) / maxRange;
        }

        return 100;
    });

    const inputEle = useRef<HTMLDivElement>(null);
    const processEle = useRef<HTMLDivElement>(null);

    const calculateDot = (e: MouseEvent) => {
        const inputClientRect = inputEle.current!.getBoundingClientRect();
        const mouseClientRect = e.clientX;
        let temp = ((mouseClientRect - inputClientRect.left) / inputClientRect.width) * 100;

        if (temp < 0) temp = 0;
        if (temp > 100) temp = 100;

        return temp;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragMinPrice) {
            requestAnimationFrame(() => {
                const currentDot = calculateDot(e);

                if (currentDot >= dotMax) {
                    setDotMin(dotMax);
                    setIsDragMinPrice(false);
                    setIsDragMaxPrice(true);
                    return;
                }

                setDotMin(currentDot);
            });
        }

        if (isDragMaxPrice) {
            requestAnimationFrame(() => {
                const currentDot = calculateDot(e);

                if (currentDot <= dotMin) {
                    setDotMax(dotMin);
                    setIsDragMaxPrice(false);
                    setIsDragMinPrice(true);
                    return;
                }

                setDotMax(currentDot);
            });
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (isDragMinPrice) setIsDragMinPrice(false);
        if (isDragMaxPrice) setIsDragMaxPrice(false);
    };

    // useEffect(() => {
    //     if (searchParams.get('price'))
    //         dispatch(
    //             menuFilterSlice.actions.addFilter({
    //                 [InputRange.name]: [['price', searchParams.get('price') as string]],
    //             }),
    //         );
    // }, []);

    useEffect(() => {
        if (dotMax === 100 && dotMin === 0) {
            setSearchParams((prev) => {
                prev.delete('price');
                return [...prev];
            });
            return;
        }

        const timeOut = setTimeout(() => {
            const valueSearch = `${percentCalculate(maxRange, dotMin)}-${percentCalculate(maxRange, dotMax)}`;

            // Don't need to addFilter if search params (search query) are of equal value search
            if (valueSearch === searchParams.get('price')) return;

            setSearchParams((prev) => {
                prev.set('price', valueSearch);
                return [...prev];
            });
            // dispatch(menuFilterSlice.actions.addFilter({ [InputRange.name]: [['price', valueSearch]] }));
        }, 300);

        return () => clearTimeout(timeOut);
    }, [dotMax, dotMin]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };
    }, [isDragMinPrice, isDragMaxPrice]);

    return (
        <Partition column>
            <PartitionRow style={{ justifyContent: 'space-between', marginBottom: '10px' }}>
                <DescriptionText className={cx('price-display')}>
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(percentCalculate(maxRange, dotMin))}
                </DescriptionText>
                <DescriptionText className={cx('price-display')}>
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(percentCalculate(maxRange, dotMax))}
                </DescriptionText>
            </PartitionRow>

            <PartitionRow>
                <div className={cx('wrapper-range')}>
                    <div
                        className={cx('rail')}
                        ref={inputEle}
                        onClick={(e) => {
                            const processClientRect = processEle.current!.getBoundingClientRect();
                            const mouseClientRect = e.clientX;
                            const processClientWant = mouseClientRect - processClientRect.left;
                            const currentDot = calculateDot(e as unknown as MouseEvent);

                            if (processClientWant <= processEle.current!.clientWidth / 2) setDotMin(currentDot);
                            else setDotMax(currentDot);
                        }}
                    >
                        <div
                            className={cx('process', {
                                ['clear-transition']: isDragMaxPrice || isDragMinPrice,
                            })}
                            style={{ left: `${dotMin}%`, width: `${100 - dotMin - (100 - dotMax)}%` }}
                            ref={processEle}
                        />
                        <div
                            className={cx('dot', 'dot_min', {
                                ['clear-transition']: isDragMaxPrice || isDragMinPrice,
                                active: isDragMinPrice,
                            })}
                            style={{ left: `${dotMin}%` }}
                            onMouseDown={() => {
                                setIsDragMinPrice(true);
                            }}
                        ></div>
                        <div
                            className={cx('dot', 'dot_max', {
                                ['clear-transition']: isDragMaxPrice || isDragMinPrice,
                                active: isDragMaxPrice,
                            })}
                            style={{ left: `${dotMax}%` }}
                            onMouseDown={() => {
                                setIsDragMaxPrice(true);
                            }}
                        ></div>
                    </div>
                    {(isDragMaxPrice || isDragMinPrice) && <div className={cx('overlay')} />}
                </div>
            </PartitionRow>
        </Partition>
    );
};

export default InputRange;
