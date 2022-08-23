import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import SearchForm from '../../components/search-form/search-form';
import Spinner from '../../components/spinner/spinner';
import { searchAsync, selectSearchLoading, selectSearchResult } from './search-reducer';

import './search.scss';

function Search() {
  const result = useAppSelector(selectSearchResult);
  const loading = useAppSelector(selectSearchLoading);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(searchAsync(searchParams.get('word') ?? ''));
  }, [dispatch, searchParams]);

  return (
    <section>
      <Spinner visible={loading} />

      <SearchForm />

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

export default Search;
