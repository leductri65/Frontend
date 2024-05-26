import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type IDataHomePage = {
    status: 'idle' | 'loading';
};

const initialData: IDataHomePage = {
    status: 'idle',
};

export const dataHomePageSlice = createSlice({
    name: 'dataHomePage',
    initialState: initialData,
    reducers: {},
    // extraReducers: (builder) => {
    // builder.addCase(getDataHomepage.pending, (state) => {
    //     state.status = 'loading';
    // });
    // builder.addCase(getDataHomepage.fulfilled, (state, action: PayloadAction<Array<IDataHomePage>>) => {
    //     state.status = 'idle';
    // });
    // },
});

export const getDataHomepage = createAsyncThunk('home/getDataHomepage', async () => {
    // const res = await fetch('https://server-tau-six.vercel.app/api/home?page=0');
    // const data = await res.json();
    // console.log(data.data.items);
    // return data.data.items;
});

// Data Selector
// data homepage
export const dataHomePageSelector = <T extends { dataHomePageReducer: IDataHomePage }>(state: T): IDataHomePage =>
    state.dataHomePageReducer;

// data source reducer
const dataHomePageReducer = dataHomePageSlice.reducer;
export default dataHomePageReducer;
