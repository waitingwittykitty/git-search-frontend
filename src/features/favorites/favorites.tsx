import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Button from '../../components/button/button';
import Pagination from '../../components/pagination/pagination';
import Spinner from '../../components/spinner/spinner';
import Table from '../../components/table/table';
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
      </Table>
    </section>
  );
}

export default Favorites;
