import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import favoritesReducer from '../features/favorites/favorites-reducer';
import searchReducer from '../features/search/search-reducer';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoritesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
