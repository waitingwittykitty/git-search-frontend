import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchForksCount, searchForks } from './search-api';

export type Fork = {
  id: number;
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

export const searchAsync = createAsyncThunk(
  'search/search',
  async ({
    query,
    page = 1,
    perPage = 10,
  }: {
    query: string;
    page: number;
    perPage: number;
  }) => {
    const [owner, repo] = query.split('/');

    const forks = await searchForks({ owner, repo, page, perPage });

    return forks;
  }
);

export const fetchForksCountAsync = createAsyncThunk(
  'search/forks_count',
  async (query: string) => {
    const [owner, repo] = query.split('/');

    const forks = await fetchForksCount({ owner, repo });

    return forks;
  }
);

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
      })
      .addCase(fetchForksCountAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchForksCountAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.total = action.payload;
      })
      .addCase(fetchForksCountAsync.rejected, state => {
        state.status = 'failed';
        state.total = 0;
      });
  },
});

export const selectSearchResult = (state: RootState) => state.search.result;
export const selectSearchLoading = (state: RootState) =>
  state.search.status === 'loading';
export const selectSearchFailed = (state: RootState) => state.search.status === 'failed';
export const selectSearchTotal = (state: RootState) => state.search.total;
export const selectSearchPageCount = (perPage: number) => (state: RootState) =>
  Math.ceil(state.search.total / perPage);

export default SearchSlice.reducer;
