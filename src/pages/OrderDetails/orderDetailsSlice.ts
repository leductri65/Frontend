import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderType } from '~/types';

export type OrderDetailsDataType = {
    status: 'loading' | 'notFound' | 'idle';
    data: OrderType | null;
};

const initialState: OrderDetailsDataType = {
    status: 'idle',
    data: null,
};

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: initialState,
    reducers: {
        clearData: (state) => {
            state.status = 'idle';
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOrderById.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getOrderById.fulfilled, (state, action: PayloadAction<OrderType>) => {
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

export const getOrderById = createAsyncThunk('order/getOrderById', async (orderId: string) => {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/order/${orderId}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'GET',
        keepalive: true,
    });

    return (await res.json())?.data ?? null;
});

export const updateOrderById = createAsyncThunk(
    'order/updateOrderById',
    async (args: { orderId: string; data: Partial<OrderType> }) => {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/order/${args.orderId}`, {
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

export const getOrderByIdSelector = <T extends { orderDetailsReducer: OrderDetailsDataType }>(
    state: T,
): OrderDetailsDataType => state.orderDetailsReducer;

const orderDetailsReducer = orderDetailsSlice.reducer;
export default orderDetailsReducer;
