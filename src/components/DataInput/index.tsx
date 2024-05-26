import classNames from 'classnames/bind';
import styles from './DataInput.module.scss';
import {
    ChangeEventHandler,
    FocusEventHandler,
    HTMLInputTypeAttribute,
    KeyboardEventHandler,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import { toCapacity } from '~/utils';

const cx = classNames.bind(styles);
type DataInputType = Pick<React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'className'> & {
    InputAttrs?: Pick<React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'className' | 'itemType'>;
    currentValue: string;
    labelValue: string;
    isTextarea?: boolean;
    cb?: (valueInput: unknown, labelValue: string) => void;
    isWrap?: boolean;
    isPrice?: boolean;
};

const DataInput: React.FC<DataInputType> = ({
    className,
    currentValue,
    labelValue,
    isTextarea = false,
    InputAttrs = {},
    cb,
    isWrap = false,
    isPrice = false,
}) => {
    const reactId = useId();
    const [value, setValue] = useState<string>(currentValue);
    const compareValue = useRef<string>(currentValue);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const Tag = isTextarea ? 'textarea' : 'input';

    const handleChangeInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        if (isPrice) {
            const decodeToString = e.target.value.replaceAll('.', '');

            setValue(decodeToString);
            return;
        }

        setValue(e.target.value);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        if (
            e.key === 'Backspace' ||
            e.key === 'Tab' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Delete' ||
            e.key === 'Enter'
        ) {
            return;
        }
        if (e.key >= '0' && e.key <= '9') {
            return;
        }
        e.preventDefault();
    };

    const dispatchUpdateProduct = () => {
        if (compareValue.current === value) return;

        cb && cb(value, labelValue);
        compareValue.current = value;
    };

    const handleKeyUp: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        if (e.key === 'Enter' && !isTextarea) {
            dispatchUpdateProduct();
        }
    };

    const handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatchUpdateProduct();
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '0px';
            const scrollHeight = textareaRef.current.scrollHeight;

            textareaRef.current.style.height = scrollHeight + 'px';
        }
    }, [value]);

    return (
        <div className={`relative flex ${isWrap ? 'flex-col' : 'items-center'} ${className}`}>
            <label className={'mr-2.5 text-nowrap text-base font-semibold text-primary'} htmlFor={reactId}>
                {toCapacity(labelValue)}:
            </label>
            <div className="relative flex w-full items-center">
                <Tag
                    ref={() => {
                        if (isTextarea) return textareaRef;
                        return null;
                    }}
                    className={`${cx('input')} bg-transparent w-full border-none text-base outline-none ${InputAttrs.className}`}
                    id={reactId}
                    value={
                        isPrice
                            ? new Intl.NumberFormat('vi-VN', {
                                  currency: 'VND',
                              }).format(parseFloat(value))
                            : value
                    }
                    spellCheck={false}
                    onChange={handleChangeInput}
                    onKeyDown={isPrice ? handleKeyDown : undefined}
                    onKeyUp={handleKeyUp}
                    onBlur={handleBlur}
                    type={'text'}
                />
                <span />
                {isPrice && <div className="text-zinc-400 select-none text-base">VND</div>}
            </div>
        </div>
    );
};

export default DataInput;
