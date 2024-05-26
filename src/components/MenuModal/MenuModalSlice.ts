import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactElement, ReactNode } from 'react';
// import { MenuModalType } from '~/types';

export type MenuType = 'filter';

export type ModalType = {
    x: number;
    y: number;
    menuType?: MenuType;
};

const initialState: ModalType = {
    x: 0,
    y: 0,
};

export const menuModalSlice = createSlice({
    name: 'menuModal',
    initialState: initialState,
    reducers: {
        openTable: (state, action: PayloadAction<{ x: number; y: number; menuType: 'filter' }>) => ({
            x: action.payload.x,
            y: action.payload.y,
            menuType: action.payload.menuType,
        }),
        closeTable: (state, action: PayloadAction) => ({ ...initialState }),
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getDataMenuPlaylist.fulfilled, (state, action) => {
    //             state.type = 'playlist';
    //             state.data = action.payload;
    //         })
    //         .addCase(getDataMenuSong.fulfilled, (state, action) => {
    //             state.type = 'song';
    //             state.data = action.payload;
    //         });
    // },
});

// table layout selector
export const menuModalSelector = <T extends { menuModalReducer: ModalType }>(state: T): ModalType => {
    return state.menuModalReducer;
};

const menuModalReducer = menuModalSlice.reducer;
export default menuModalReducer;
