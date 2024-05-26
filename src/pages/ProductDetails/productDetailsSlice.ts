import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '~/types';

export type ProductDetailsDataType = {
    status: 'loading' | 'notFound' | 'idle';
    data: ProductType | null;
};

const initialState: ProductDetailsDataType = {
    status: 'idle',
    data: null,
};

export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: initialState,
    reducers: {
        clearData: (state) => {
            state.status = 'idle';
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductById.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getProductById.fulfilled, (state, action: PayloadAction<ProductType>) => {
            if (action.payload === null) {
                state.data = null;
                state.status = 'notFound';
                return;
            }

            state.status = 'idle';
            state.data = action.payload;
        });
    },
});

export const getProductById = createAsyncThunk('product/getProductById', async (productId: string) => {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/product/${productId}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'GET',
        keepalive: true,
    });

    return (await res.json())?.data ?? null;
});

export const updateProductById = createAsyncThunk(
    'product/updateProductById',
    async (args: { productId: string; data: Partial<ProductType> }) => {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/product/${args.productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(args.data),
            keepalive: true,
        });

        return (await res.json())?.data ?? null;
    },
);

export const getProductByIdSelector = <T extends { productDetailsReducer: ProductDetailsDataType }>(
    state: T,
): ProductDetailsDataType => state.productDetailsReducer;

const productDetailsReducer = productDetailsSlice.reducer;
export default productDetailsReducer;
