import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  fetchFavoritesCount,
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from './favorites-api';

export type Fork = {
  id: number;
  name: string;
  owner: string;
  stars: number;
  link: string;
};

export interface FavoritesState {
  total: number;
  page: number;
  query: string;
  result: Fork[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: FavoritesState = {
  total: 0,
  page: 1,
  query: '',
  result: [],
  status: 'idle',
};

export const fetchFavoritesAsync = createAsyncThunk(
  'favorites/fetch',
  async ({ page = 1, perPage = 10 }: { page: number; perPage: number }) => {
    const favorites = await fetchFavorites({ page, perPage });

    return favorites;
  }
);

export const fetchFavoritesCountAsync = createAsyncThunk('favorites/count', async () => {
  const count = await fetchFavoritesCount();

  return count;
});

export const addFavoriteAsync = createAsyncThunk('favorites/add', async (fork: Fork) => {
  await addFavorite(fork);
});

export const removeFavoriteAsync = createAsyncThunk(
  'favorites/remove',
  async (forkId: number) => {
    await removeFavorite(forkId);
  }
);

export const FavoritesSlice = createSlice({
  name: 'Favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavoritesAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchFavoritesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.result = action.payload;
      })
      .addCase(fetchFavoritesAsync.rejected, state => {
        state.status = 'failed';
      })
      .addCase(fetchFavoritesCountAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchFavoritesCountAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.total = action.payload;
      })
      .addCase(fetchFavoritesCountAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectFavoritesResult = (state: RootState) => state.favorites.result;
export const selectFavoritesLoading = (state: RootState) =>
  state.favorites.status === 'loading';
export const selectFavoritesFailed = (state: RootState) =>
  state.favorites.status === 'failed';
export const selectFavoritesTotal = (state: RootState) => state.favorites.total;
export const selectFavoritesPageCount = (perPage: number) => (state: RootState) =>
  Math.ceil(state.favorites.total / perPage);

export default FavoritesSlice.reducer;
