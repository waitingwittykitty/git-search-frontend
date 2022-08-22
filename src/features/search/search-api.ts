import type { Fork } from './search-reducer';

export function search(query: string) {
  return new Promise<{ data: Fork[] }>(resolve =>
    setTimeout(() => resolve({ data: [] }), 500)
  );
}
