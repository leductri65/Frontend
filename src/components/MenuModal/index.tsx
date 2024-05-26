import { useAppDispatch, useAppSelector } from '~/hooks';
import { MenuType, ModalType, menuModalSelector, menuModalSlice } from './MenuModalSlice';
import { useEffect, useRef, useState } from 'react';
import { withMouseEventOutSide } from '~/HoCs';
import styles from './MenuModal.module.scss';
import classNames from 'classnames/bind';
import { createPortal } from 'react-dom';
import MenuFilter from '../MenuFilter';

const cx = classNames.bind(styles);

const portalEle = document.getElementById('portal');
type MenuModalProps = {};

const MenuModal: React.FC<MenuModalProps> = ({}) => {
    const dispatch = useAppDispatch();
    const menuModal: ModalType = useAppSelector(menuModalSelector);
    const wrapperEle = useRef<HTMLDivElement>(null);
    const [wrapperSize, setWrapperSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        if (wrapperEle.current!) {
            setWrapperSize({ width: wrapperEle.current?.offsetWidth, height: wrapperEle.current?.offsetHeight });
        }
    }, [menuModal]);

    if (!menuModal.x || !menuModal.y || !menuModal.menuType) return null;

    const Element = withMouseEventOutSide({
        parentNode: portalEle,
        executeFunction: () => {
            dispatch(menuModalSlice.actions.closeTable());
        },
        isKeyEscape: true,
    })(MenuModalWrapper);

    const handleCalculatorX = () => {
        if (wrapperSize.width + menuModal.x > window.innerWidth) {
            return { x: menuModal.x - wrapperSize.width - 10, side: 'right' };
        }
        return { x: menuModal.x + 10, side: 'left' };
    };

    const handleCalculatorY = () => {
        if (wrapperSize.height + menuModal.y > window.innerHeight) {
            return { y: menuModal.y - wrapperSize.height - 10, side: 'bottom' };
        }
        return { y: menuModal.y + 10, side: 'top' };
    };

    return createPortal(
        <div
            ref={wrapperEle}
            className={cx('wrapper')}
            style={{ left: `${handleCalculatorX().x}px`, top: `${handleCalculatorY().y}px` }}
            role="presentation"
        >
            <Element type={menuModal.menuType} />
            <div className={cx('arrow', handleCalculatorX().side, handleCalculatorY().side)} />
        </div>,
        portalEle as Element,
    );
};

const MenuModalWrapper: React.FC<{ type?: MenuType }> = ({ type }) => {
    return (
        <div>
            {(() => {
                switch (type) {
                    case 'filter':
                        return <MenuFilter />;

                    default:
                        return null;
                }
            })()}
        </div>
    );
};
export default MenuModal;
