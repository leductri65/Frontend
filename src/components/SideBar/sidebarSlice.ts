import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { sidebarTypeState } from '~/types';

const initialStateSidebar: sidebarTypeState = {
    isShow: false,
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: initialStateSidebar,
    reducers: {
        toggleShow: (state, action: PayloadAction) => ({ isShow: !state.isShow }),
        hideSidebar: (state, action: PayloadAction) => ({ isShow: false }),
    },
});

export const sidebarSelector = <T extends { sidebarReducer: sidebarTypeState }>(state: T) => {
    return state.sidebarReducer;
};

const sidebarReducer = sidebarSlice.reducer;
export default sidebarReducer;
