import OrderType from './Order.Type';
import ProductType from './Product.Type';

type OrderDetailType = {
    id: string;
    quantity: number;
    initial_price: number;
    sale_price: number;
    total_price: number;

    order_id: string;

    order: OrderType;

    product_id: string;

    product: ProductType;

    promotion_code: string;
};

export default OrderDetailType;
