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
  const forks = favoritesData ? JSON.parse(favoritesData) : { data: [], count: 0 };

  forks?.data.push(fork);
  forks.count++;
  localStorage.setItem('git-search:favorites', JSON.stringify(forks));
}

export async function removeFavorite(forkId: number) {
  const favoritesData = localStorage.getItem('git-search:favorites');
  const forks = favoritesData ? JSON.parse(favoritesData) : { data: [], count: 0 };

  forks.data = forks.data.filter((fork: Fork) => fork.id !== forkId);
  forks.count--;
  localStorage.setItem('git-search:favorites', JSON.stringify(forks));
}
