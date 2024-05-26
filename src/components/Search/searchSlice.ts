// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { AlbumType, ArrayLengthType, Playlist, ArtistProps, SongType } from '~/types';

// type DataSearchRemainder = Playlist & AlbumType & SongType & ArtistProps & { objectType: string };

// export type InitialState = {
//     status: 'idle' | 'loading';
//     result: ArrayLengthType<DataSearchRemainder, 6> | undefined;
// };

// const initialState: InitialState = {
//     status: 'idle',
//     result: undefined,
// };

// export const searchSlice = createSlice({
//     name: 'search',
//     initialState: initialState,
//     reducers: {
//         clearSong: (state, action: PayloadAction) => ({ status: 'idle', result: undefined }),
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(searchSong.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(searchSong.fulfilled, (state, action) => {
//                 state.result = action.payload;
//                 state.status = 'idle';
//             });
//     },
// });

// export const searchSong = createAsyncThunk('search/searchSong', async (keywords: string) => {
//     try {
//         const res = await fetch(`https://server-tau-six.vercel.app/api/search?keyword=${JSON.stringify(keywords)}`);
//         const data = await res.json();
//         console.log(data);

//         let dataRemainder: ArrayLengthType<DataSearchRemainder, 6> | undefined;

//         if (data.data.top) {
//             dataRemainder = [
//                 { ...data.data.top },
//                 { ...data.data.songs[0] },
//                 { ...data.data.songs[1] },
//                 { ...data.data.songs[2] },
//                 { ...data.data.songs[3] },
//                 { ...data.data.songs[4] },
//             ];
//         } else {
//             dataRemainder = [
//                 { ...data.data.songs[0] },
//                 { ...data.data.songs[1] },
//                 { ...data.data.songs[2] },
//                 { ...data.data.songs[3] },
//                 { ...data.data.songs[4] },
//                 { ...data.data.songs[5] },
//             ];
//         }

//         return dataRemainder;
//     } catch (error) {
//         // console.log(error);
//     }
// });

// const searchReducer = searchSlice.reducer;

// export const searchSelector = <T extends { searchReducer: InitialState }>(state: T) => state.searchReducer;

// export default searchReducer;
