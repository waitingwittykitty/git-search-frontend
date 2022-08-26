import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Button from '../../components/button/button';
import Confirm from '../../components/confirm/confirm';
import Modal from '../../components/modal/modal';
import { notify } from '../../components/notification/notification-reducer';
import Pagination from '../../components/pagination/pagination';
import Spinner from '../../components/spinner/spinner';
import Table from '../../components/table/table';
import {
  fetchFavoritesAsync,
  Fork,
  removeFavoriteAsync,
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
  const [isConfirmOpened, setIsConfirmOpened] = useState(false);
  const [selectedFork, setSelectedFork] = useState<Fork | null>(null);
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

  const handleRemoveFavorite = (fork: Fork) => () => {
    setIsConfirmOpened(true);
    setSelectedFork(fork);
  };

  const handleConfirmRemoveFavorite = async () => {
    if (selectedFork) {
      await dispatch(removeFavoriteAsync(selectedFork.id));
      await dispatch(fetchFavoritesAsync());
      dispatch(notify({ title: 'Success', description: 'Removed successfully' }));
    }
  };

  const toggleConfirm = () => {
    setIsConfirmOpened(isConfirmOpened => !isConfirmOpened);
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
            <th>...</th>
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
                <td>
                  <Button className="button" onClick={handleRemoveFavorite(fork)}>
                    Remove from Favorites
                  </Button>
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

      <Modal isOpened={isConfirmOpened} toggle={toggleConfirm}>
        <Confirm
          title="Remove from Favorites"
          description={`Are you sure you want to remove this fork (${selectedFork?.owner}/${selectedFork?.name}) from your favorites?`}
          onOk={handleConfirmRemoveFavorite}
          toggle={toggleConfirm}
        />
      </Modal>
    </section>
  );
}

export default Favorites;
