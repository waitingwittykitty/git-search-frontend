import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Confirm from '../../components/confirm/confirm';
import Modal from '../../components/modal/modal';
import Pagination from '../../components/pagination/pagination';
import SearchForm from '../../components/search-form/search-form';
import Spinner from '../../components/spinner/spinner';
import { addFavoriteAsync } from '../favorites/favorites-reducer';
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
  const [isConfirmOpened, setIsConfirmOpened] = useState(false);
  const [selectedFork, setSelectedFork] = useState<Fork | null>(null);

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

  const handleAddFavorite = (fork: Fork) => () => {
    setIsConfirmOpened(true);
    setSelectedFork(fork);
  };

  const handleConfirmAddFavorite = () => {
    if (selectedFork) {
      dispatch(addFavoriteAsync(selectedFork));
    }
  };

  const toggleConfirm = () => {
    setIsConfirmOpened(isConfirmOpened => !isConfirmOpened);
  };

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

      <Modal isOpened={isConfirmOpened} toggle={toggleConfirm}>
        <Confirm
          title="Add to Favorite"
          description={`Are you sure you want to add this fork (${selectedFork?.owner}/${selectedFork?.name}) to your favorites?`}
          onOk={handleConfirmAddFavorite}
          toggle={toggleConfirm}
        />
      </Modal>
    </section>
  );
}

export default Search;
