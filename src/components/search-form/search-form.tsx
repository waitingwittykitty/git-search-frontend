import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import './search-form.scss';

function SearchForm() {
  const [word, setWord] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleChangeWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    searchParams.set('word', word);
    navigate('/search?' + searchParams.toString());
  };

  return (
    <form method="GET" action="/search" onSubmit={handleSubmit}>
      <input type="text" name="word" value={word} onChange={handleChangeWord} />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
