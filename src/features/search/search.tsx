import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Pagination from '../../components/pagination/pagination';
import SearchForm from '../../components/search-form/search-form';
import Spinner from '../../components/spinner/spinner';
import {
  fetchForksCountAsync,
  Fork,
  searchAsync,
  selectSearchLoading,
  selectSearchPageCount,
  selectSearchResult,
} from './search-reducer';

import './search.scss';

function Search() {
  const result = useAppSelector(selectSearchResult);
  const loading = useAppSelector(selectSearchLoading);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('word') || '';
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('height')) || 10;
  const pageCount = useAppSelector(selectSearchPageCount(perPage));

  useEffect(() => {
    dispatch(searchAsync({ query, page, perPage }));
    dispatch(fetchForksCountAsync(query));
  }, [dispatch, query, page, perPage]);

  const handleChangePage = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: page.toString(),
    });
  };

  const handleAddFavorite = (fork: Fork) => () => {};

  return (
    <section>
      <Spinner visible={loading} />

      <SearchForm />

      <Pagination total={pageCount} page={page} onChangePage={handleChangePage} />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Stars</th>
            <th>Link</th>
            <th>Favorite</th>
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
              <td>
                <button onClick={handleAddFavorite(fork)}>Add to Favorites</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Search;
