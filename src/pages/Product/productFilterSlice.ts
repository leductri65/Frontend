import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import VariantsType from '~/types/variantsType';

export type ProductFilterType = {
    status: 'loading' | 'idle' | 'initial';
    productFilters: {
        maxPrice: number;
        variantsFilter: Array<{ name: string; variant: VariantsType }>;
        attributesFilter: Array<string>;
    };
};

const initialState: ProductFilterType = {
    status: 'initial',
    productFilters: {
        maxPrice: 0,
        variantsFilter: [],
        attributesFilter: [],
    },
};

export const productFilterSlice = createSlice({
    name: 'productFilterSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductFilters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                getProductFilters.fulfilled,
                (state, action: PayloadAction<Pick<ProductFilterType, 'productFilters'>>) => {
                    state.status = 'idle';
                    state.productFilters = action.payload as unknown as {
                        maxPrice: number;
                        variantsFilter: Array<{
                            name: string;
                            variant: VariantsType;
                        }>;
                        attributesFilter: Array<string>;
                    };
                },
            );
    },
});

export const getProductFilters = createAsyncThunk('product/getProductFilters', async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/product/filter-options`, {
        method: 'GET',
        keepalive: true,
    });

    const data = await res.json();

    return data;
});

// selector

export const productFiltersSelector = <T extends { productFilterReducer: ProductFilterType }>(
    state: T,
): ProductFilterType => state.productFilterReducer;

// data source reducer
const productFilterReducer = productFilterSlice.reducer;
export default productFilterReducer;
