import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Pagination from '../../components/pagination/pagination';
import Spinner from '../../components/spinner/spinner';
import {
  fetchFavoritesCountAsync,
  fetchFavoritesAsync,
  selectFavoritesLoading,
  selectFavoritesPageCount,
  selectFavoritesResult,
} from './favorites-reducer';

import './favorites.scss';

function Favorites() {
  const result = useAppSelector(selectFavoritesResult);
  const loading = useAppSelector(selectFavoritesLoading);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('height')) || 10;
  const pageCount = useAppSelector(selectFavoritesPageCount(perPage));

  useEffect(() => {
    dispatch(fetchFavoritesAsync({ page, perPage }));
    dispatch(fetchFavoritesCountAsync());
  }, [dispatch, page, perPage]);

  const handleChangePage = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: page.toString(),
    });
  };

  return (
    <section>
      <Spinner visible={loading} />

      <Pagination total={pageCount} page={page} onChangePage={handleChangePage} />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Stars</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {result.map(fork => (
            <tr key={fork.id}>
              <td>{fork.name}</td>
              <td>{fork.owner}</td>
              <td>{fork.stars}</td>
              <td>
                <a href={fork.link}>{fork.link}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Favorites;
