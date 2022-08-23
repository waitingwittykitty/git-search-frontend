import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { search } from './search-api';

export type Fork = {
  name: string;
  owner: string;
  stars: number;
  link: string;
};

export interface SearchState {
  total: number;
  page: number;
  query: string;
  result: Fork[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SearchState = {
  total: 0,
  page: 1,
  query: '',
  result: [],
  status: 'idle',
};

export const searchAsync = createAsyncThunk('search/search', async (query: string) => {
  const response = await search(query);

  return response.data;
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
      });
  },
});

export const selectSearchResult = (state: RootState) => state.search.result;

export default SearchSlice.reducer;
