import CustomerType from './Customer.Type';
import OrderDetailType from './OrderDetail.Type';
import StoreType from './Store.Type';
import UserType from './User.Type';

type OrderType = {
    id: string;

    shipping_material: string;

    shipping_city: string;

    shipping_district: string;

    shipping_ward: string;

    shipping_description: string;

    status: 'quotation' | 'confirmed' | 'completed' | 'cancel';

    note: string;

    total_price: number;

    arrears: number;

    discount_value: number;

    discount_unit: 'percent' | 'cost';

    order_details: Array<OrderDetailType>;

    customer_id: string;

    customer: CustomerType;

    employee_id: string;

    employee: UserType;

    store_name: string;

    store: StoreType;
};

export default OrderType;
