import { useState, useRef, HTMLAttributes } from 'react';

//scss
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
// Overlay Scrollbar
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
//React icons
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosTrendingUp } from 'react-icons/io';
import { VscClose } from 'react-icons/vsc';
// import { BsFillPlayFill } from 'react-icons/bs';
// import { AiOutlineHeart } from 'react-icons/ai';
// import { HiEllipsisHorizontal } from 'react-icons/hi2';

// in project
// import { searchSelector, searchSong, InitialState, searchSlice } from './searchSlice';
import { withMouseEventOutSide } from '~/HoCs';
// import { useAppDispatch, useAppSelector } from '~/hooks';
import { DescriptionText, Partition, Title, MyButton } from '..';
import PartitionCol from '../Partition/PartitionCol';

const cx = classNames.bind(styles);

const fakeApiSuggestList: Array<string> = [
    'nếu lúc đó',
    'thị màu',
    'ưng quá chừng',
    'là anh',
    '#zingchart',
    'ngủ ngon',
];

type ISuggestItem = HTMLAttributes<HTMLLIElement> & {
    contentLeft: React.ReactNode;
    contentRight: React.ReactNode;
    children?: React.ReactNode;
};

const SuggestItem: React.FC<ISuggestItem> = ({ contentLeft, contentRight, style, className, children }) => {
    return (
        <li className={cx('suggest-item').concat(' ', className ? className : '')} style={{ ...style }}>
            <Partition>
                <PartitionCol style={{ marginRight: '10px' }}>{contentLeft}</PartitionCol>
                <PartitionCol hidden prioritize>
                    {contentRight}
                </PartitionCol>
                {children}
            </Partition>
        </li>
    );
};

interface ISuggestList {
    children: React.ReactNode;
}

const SuggestList: React.FC<ISuggestList> = ({ children }) => {
    return (
        <div className={cx('suggest-list')}>
            <OverlayScrollbarsComponent
                defer
                className={cx('suggest-list--content')}
                element="ul"
                options={{ scrollbars: { theme: 'os-theme-custom' } }}
            >
                {children}
            </OverlayScrollbarsComponent>
        </div>
    );
};

interface ISearchProps {}

const Search: React.FC<ISearchProps> = (props) => {
    // get data with redux
    // const dispatch = useAppDispatch();
    // const suggestList: InitialState = useAppSelector(searchSelector);

    // useState
    const [searchText, setSearchText] = useState<string>('');
    const [isFocus, setIsFocus] = useState<boolean>(false);

    // useRef
    const searchWrapperRef = useRef<HTMLDivElement | null>(null);
    const searchRef = useRef<HTMLInputElement | null>(null);
    const debounceSearch = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Event handler
    const handleChangeSearchText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const valueSearchText: string = e.currentTarget.value;

        setSearchText(valueSearchText);

        if (debounceSearch.current) {
            clearTimeout(debounceSearch.current);
        }

        debounceSearch.current = setTimeout(() => {
            // dispatch(searchSong(valueSearchText));
        }, 500);
    };

    const handleFocusSearchText: React.FocusEventHandler<HTMLInputElement> = (e) => {
        setIsFocus(true);
    };

    const handleKeyboardSearchText: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (isFocus === false) {
            setIsFocus(true);
        }
    };

    const handleClearSearchText: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        setSearchText('');
        // dispatch(searchSlice.actions.clearSong());
        searchRef.current!.focus();
    };

    const SuggestListAddEventEscape = withMouseEventOutSide({
        parentNode: searchWrapperRef.current!,
        executeFunction: () => {
            setIsFocus(false);
        },
    })(SuggestList);

    return (
        <div
            className={cx('wrapper', {
                ['is-collapse']: isFocus,
            })}
            ref={searchWrapperRef}
        >
            <MyButton variant="transparent" isRounded className={cx('btn-search')}>
                <IoSearchOutline />
            </MyButton>

            <div className={cx('wrapper-input')}>
                <input
                    ref={searchRef}
                    onFocus={handleFocusSearchText}
                    onChange={handleChangeSearchText}
                    onKeyDown={handleKeyboardSearchText}
                    value={searchText}
                    type="text"
                    className={cx('input')}
                    placeholder="Tìm kiếm..."
                    spellCheck="false"
                />
            </div>

            <MyButton
                variant="transparent"
                isRounded
                className={cx('btn-close', {
                    ['btn-close-disabled']: searchText === '',
                })}
                onClick={handleClearSearchText}
            >
                <VscClose />
            </MyButton>

            {isFocus && (
                <SuggestListAddEventEscape>
                    {searchText === '' && (
                        <>
                            <h3 className={cx('title')}>Đề xuất cho bạn</h3>

                            {fakeApiSuggestList.map((item, index) => (
                                <SuggestItem
                                    key={index}
                                    contentLeft={<IoIosTrendingUp />}
                                    contentRight={<Title style={{ textTransform: 'lowercase' }}>{item}</Title>}
                                />
                            ))}
                        </>
                    )}

                    {/* {searchText !== '' && (
                        <>
                            <h3 className={cx('title')}>Từ khóa liên quan</h3>

                            {suggestList.status === 'idle' &&
                                suggestList.result?.map((item, index) => {
                                    return (
                                        <SuggestItem
                                            key={item.encodeId || item.id}
                                            contentLeft={<IoIosTrendingUp />}
                                            contentRight={
                                                <Title style={{ textTransform: 'lowercase' }}>
                                                    {item.title || item.name}
                                                </Title>
                                            }
                                        />
                                    );
                                })}

                            <SuggestItem
                                contentLeft={<IoSearchOutline />}
                                contentRight={
                                    <Title style={{ fontWeight: '700' }}>
                                        <span style={{ fontWeight: '400' }}>Tìm kiếm </span>"{searchText}"
                                    </Title>
                                }
                            />

                            {suggestList.status === 'idle' && suggestList.result?.length && (
                                <>
                                    <WallSeparator style={{ marginBottom: '10px' }} />

                                    <h3 className={cx('title')}>Gợi ý kết quả</h3>

                                    {suggestList.result?.map((item) => {
                                        return (
                                            <SuggestItem
                                                key={item.encodeId || item.id}
                                                style={{ cursor: 'default' }}
                                                contentLeft={
                                                    <MyImage
                                                        style={{
                                                            ...(item.objectType === 'artist'
                                                                ? {
                                                                      borderRadius: `999px`,
                                                                      overflow: 'hidden',
                                                                  }
                                                                : ''),
                                                            width: '52px',
                                                            height: 'auto',
                                                        }}
                                                        thumbnail={item.thumbnailM || item.thumbnail}
                                                    >
                                                        <MyButton variant="transparent" className={cx('btn-play')}>
                                                            <BsFillPlayFill />
                                                        </MyButton>
                                                    </MyImage>
                                                }
                                                contentRight={
                                                    <Partition column>
                                                        <PartitionRow>
                                                            <Title link={item.link!}>{item.title || item.name}</Title>
                                                        </PartitionRow>

                                                        {item.artists && (
                                                            <PartitionRow>
                                                                <ArtistDescription line={1} artists={item.artists} />
                                                            </PartitionRow>
                                                        )}
                                                    </Partition>
                                                }
                                            >
                                                <PartitionCol>
                                                    {[
                                                        { icon: <AiOutlineHeart />, ttContent: 'Thêm vào thư viện' },
                                                        { icon: <HiEllipsisHorizontal />, ttContent: 'Khác' },
                                                    ].map((item, index) => (
                                                        <MyButton
                                                            key={index}
                                                            variant="transparent"
                                                            isRounded
                                                            className={cx('btn-suggest-item')}
                                                            tooltipProps={{ content: item.ttContent }}
                                                        >
                                                            {item.icon}
                                                        </MyButton>
                                                    ))}
                                                </PartitionCol>
                                            </SuggestItem>
                                        );
                                    })}
                                </>
                            )}
                        </>
                    )} */}
                </SuggestListAddEventEscape>
            )}
        </div>
    );
};

export default Search;
