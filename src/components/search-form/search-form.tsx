import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import Search from './search.svg';

import './search-form.scss';

function SearchForm() {
  const [word, setWord] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setWord(searchParams.get('word') ?? '');
  }, [searchParams]);

  const handleChangeWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    searchParams.set('word', word);
    navigate('/search?' + searchParams.toString());
  };

  return (
    <div className="form-container">
      <form className="search-form" method="GET" action="/search" onSubmit={handleSubmit}>
        <div className="wrapper">
          <span className="image-container">
            <img src={Search} alt="search" />
          </span>
          <input
            type="text"
            name="word"
            value={word}
            placeholder="Enter the full name (owner/repo) of a repository to find forks. e.g. vue/vue"
            onChange={handleChangeWord}
          />
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
