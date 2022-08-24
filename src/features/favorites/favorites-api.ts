import type { Fork } from './favorites-reducer';

interface FetchFavoritesParams {
  page: number;
  perPage: number;
}

export async function fetchFavorites({
  page = 1,
  perPage = 10,
}: FetchFavoritesParams): Promise<Fork[]> {
  const favoritesData = localStorage.getItem('git-search:favorites');
  const forks = favoritesData ? JSON.parse(favoritesData) : { data: [], count: 0 };

  return forks?.data.slice((page - 1) * perPage, perPage) ?? [];
}

export async function fetchFavoritesCount(): Promise<number> {
  const favoritesData = localStorage.getItem('git-search:favorites');
  const forks = favoritesData ? JSON.parse(favoritesData) : { data: [], count: 0 };

  return forks?.count ?? 0;
}

export async function addFavorite(fork: Fork) {
  const favoritesData = localStorage.getItem('git-search:favorites');
  const favorites = favoritesData ? JSON.parse(favoritesData) : { data: [], count: 0 };

  const isNewFavorite = favorites.data.every((favorite: Fork) => favorite.id !== fork.id);

  if (isNewFavorite) {
    favorites.data.push(fork);
    favorites.count++;
    localStorage.setItem('git-search:favorites', JSON.stringify(favorites));
  }
}

export async function removeFavorite(forkId: number) {
  const favoritesData = localStorage.getItem('git-search:favorites');
  const favorites = favoritesData ? JSON.parse(favoritesData) : { data: [], count: 0 };

  favorites.data = favorites.data.filter((favorite: Fork) => favorite.id !== forkId);
  favorites.count = favorites.data.length;
  localStorage.setItem('git-search:favorites', JSON.stringify(favorites));
}
