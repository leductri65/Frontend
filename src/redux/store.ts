import { configureStore } from '@reduxjs/toolkit';
import menuModalReducer from '~/components/MenuModal/MenuModalSlice';
import orderDetailsReducer from '~/pages/OrderDetails/orderDetailsSlice';
import productPageReducer from '~/pages/Product/productDataSlice';
import productFilterReducer from '~/pages/Product/productFilterSlice';
import productDetailsReducer from '~/pages/ProductDetails/productDetailsSlice';

const store = configureStore({
    reducer: { productPageReducer, menuModalReducer, productFilterReducer, productDetailsReducer, orderDetailsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
