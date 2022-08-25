import { child, get, ref, set } from 'firebase/database';
import { db } from '../../firebase';
import type { Fork } from './favorites-reducer';

export async function fetchFavorites(): Promise<Fork[]> {
  const snapshot = await get(child(ref(db), 'favorites'));

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  }

  return [];
}

export async function addFavorite(fork: Fork) {
  set(ref(db, 'favorites/' + fork.id), fork);
}

export async function removeFavorite(forkId: number) {
  set(ref(db, 'favorites/' + forkId), null);
}
