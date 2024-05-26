import VariantsType from './Variants.Type';

type ProductType = {
    id: string;
    name: string;
    description: string;
    barcode: string;
    image: string;
    custom_fields: { [x: string]: string };
    weight: string;
    height: string;
    width: string;
    length: string;
    brand: string;
    price: string;
    master_id: string;
    promotion_codes: string;
    order_details: string;
    inventory: string;
    variants: VariantsType;
    date_created: string;
    date_modified: string;
};

export const productAttributes = ['id', 'name', 'barcode', 'weight', 'height', 'width', 'length', 'brand'];

export default ProductType;
