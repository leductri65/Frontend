import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '~/types';

export type ProductPageDataType = {
    status: 'idle' | 'loading' | 'notFound' | 'error';
    data: {
        data: Array<ProductType>;
    };
};

const initialData: ProductPageDataType = {
    status: 'idle',
    data: {
        data: [],
    },
};

export const productPage = createSlice({
    name: 'productPage',
    initialState: initialData,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                getAllProduct.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        data: Array<ProductType>;
                    }>,
                ) => {
                    state.status = action.payload.data.length > 0 ? 'idle' : 'notFound';
                    state.data = action.payload;
                },
            )
            .addCase(
                getAllProduct.rejected,
                (
                    state,
                    // action: PayloadAction<{
                    //     data: Array<ProductType>;
                    // }>,
                ) => {
                    state.status = 'error';
                },
            );
    },
});

export const getAllProduct = createAsyncThunk('product/getAllProduct', async (query: string, { rejectWithValue }) => {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/product${query}`, {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache',
        },
        keepalive: true,
    });

    const data = await res.json();
    if (res.ok) return data;
    else return rejectWithValue(data);
});

// Data Selector
export const dataProductPageSelector = <T extends { productPageReducer: ProductPageDataType }>(
    state: T,
): ProductPageDataType => state.productPageReducer;

// data source reducer
const productPageReducer = productPage.reducer;
export default productPageReducer;
