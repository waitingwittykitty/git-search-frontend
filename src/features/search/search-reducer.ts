import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { searchForks } from './search-api';

export type Fork = {
  id: number;
  name: string;
  owner: string;
  stars: number;
  link: string;
};

export interface SearchState {
  result: Fork[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SearchState = {
  result: [],
  status: 'idle',
};

export const searchAsync = createAsyncThunk('search/search', async (query: string) => {
  const [owner, repo] = query.split('/');

  const forks = await searchForks({ owner, repo });

  return forks;
});

export const SearchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.result = action.payload;
      })
      .addCase(searchAsync.rejected, state => {
        state.status = 'failed';
        state.result = [];
      });
  },
});

export const selectSearchResult = (state: RootState) => state.search.result;
export const selectSearchLoading = (state: RootState) =>
  state.search.status === 'loading';
export const selectSearchFailed = (state: RootState) => state.search.status === 'failed';
export const selectSearchTotal = (state: RootState) => state.search.result.length;
export const selectSearchPageCount = (perPage: number) => (state: RootState) =>
  Math.ceil(state.search.result.length / perPage);

export default SearchSlice.reducer;
