import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchFavorites, addFavorite, removeFavorite } from './favorites-api';

export type Fork = {
  id: number;
  name: string;
  owner: string;
  stars: number;
  link: string;
};

export interface FavoritesState {
  result: Fork[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: FavoritesState = {
  result: [],
  status: 'idle',
};

export const fetchFavoritesAsync = createAsyncThunk('favorites/fetch', async () => {
  const favorites = await fetchFavorites();

  return favorites;
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
        state.result = [];
      });
  },
});

export const selectFavoritesResult = (state: RootState) => state.favorites.result;
export const selectFavoritesLoading = (state: RootState) =>
  state.favorites.status === 'loading';
export const selectFavoritesFailed = (state: RootState) =>
  state.favorites.status === 'failed';
export const selectFavoritesTotal = (state: RootState) => state.favorites.result.length;
export const selectFavoritesPageCount = (perPage: number) => (state: RootState) =>
  Math.ceil(state.favorites.result.length / perPage);

export default FavoritesSlice.reducer;
