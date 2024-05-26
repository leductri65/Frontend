import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConstraintsLengthArray } from '~/types';

type MenuFilterType = { querySearchParams: { [x: string]: Array<ConstraintsLengthArray<string, 2>> } };
const initialState: MenuFilterType = {
    querySearchParams: {},
};

export const menuFilterSlice = createSlice({
    name: 'menuFilter',
    initialState: initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<{ [x: string]: Array<ConstraintsLengthArray<string, 2>> }>) => {
            state.querySearchParams = { ...state.querySearchParams, ...action.payload };
        },
    },
});

export const querySearchParamsSelector = <T extends { menuFilterReducer: MenuFilterType }>(state: T) => {
    return state.menuFilterReducer.querySearchParams;
};

const menuFilterReducer = menuFilterSlice.reducer;
// export default menuFilterReducer;
