import { SyntheticEvent } from 'react';

import './search-form.scss';

function SearchForm() {
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <form method="GET" action="/search" onSubmit={handleSubmit}>
      <input type="text" name="word" />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
