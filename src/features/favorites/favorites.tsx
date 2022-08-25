import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Button from '../../components/button/button';
import Pagination from '../../components/pagination/pagination';
import Spinner from '../../components/spinner/spinner';
import Table from '../../components/table/table';
import {
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
  const forks = useMemo(
    () => result?.slice((page - 1) * perPage, page * perPage),
    [result, page, perPage]
  );

  useEffect(() => {
    dispatch(fetchFavoritesAsync());
  }, [dispatch, page, perPage]);

  const handleChangePage = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: page.toString(),
    });
  };

  return (
    <section className="container page-container page-favorites">
      <Spinner visible={loading} />

      <Pagination
        total={pageCount}
        page={page}
        onChangePage={handleChangePage}
        buttonAs={Button}
      />

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Stars</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {forks && forks.length > 0 ? (
            forks.map(fork => (
              <tr key={fork.id}>
                <td>{fork.name}</td>
                <td>{fork.owner}</td>
                <td>{fork.stars}</td>
                <td>
                  <a href={fork.link}>{fork.link}</a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No results</td>
            </tr>
          )}
        </tbody>
      </Table>
    </section>
  );
}

export default Favorites;
