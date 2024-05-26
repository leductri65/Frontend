import classNames from 'classnames/bind';
import styles from './OrderDetails.module.scss';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useChangeDocTitle } from '~/hooks';
import { getOrderById, getOrderByIdSelector, orderDetailsSlice } from './orderDetailsSlice';
import { useEffect } from 'react';
import { Title } from '~/components';

const cx = classNames.bind(styles);
type OrderDetailsProps = {};

const OrderDetails: React.FC<OrderDetailsProps> = ({}) => {
    const dispatch = useAppDispatch();
    const { orderId } = useParams();
    useChangeDocTitle(orderId);
    const { status, data } = useAppSelector(getOrderByIdSelector);

    useEffect(() => {
        if (orderId) dispatch(getOrderById(orderId));

        () => dispatch(orderDetailsSlice.actions.clearData());
    }, []);

    if (status === 'notFound') return <Title link={'/order'}>Not found order with id: {orderId}</Title>;

    return <div className={cx('wrapper')}>OrderDetails</div>;
};

export default OrderDetails;
