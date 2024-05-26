import styles from './MyButton.module.scss';

import classNames from 'classnames/bind';
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: 'primary' | 'secondary' | 'transparent';
    isRounded?: boolean;
    isBorder?: boolean;
    disabled?: boolean;
    tooltipProps?: TippyProps;
    children: React.ReactNode;
};

const MyButton: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
    { children, tooltipProps, isRounded, isBorder, disabled, variant, className, ...restProps },
    ref,
) => {
    return (
        <Tippy disabled={!tooltipProps as unknown as boolean} {...tooltipProps}>
            <button
                className={`${className || ''} ${cx(variant, 'btn', {
                    ['rounded']: isRounded,
                    ['disabled']: disabled,
                    ['is-border']: isBorder,
                })}`.trim()}
                ref={ref}
                {...restProps}
            >
                {children}
            </button>
        </Tippy>
    );
};

export default forwardRef(MyButton);
