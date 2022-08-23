import SearchForm from '../../components/search-form/search-form';
import Logo from '../../logo.svg';

import './home.scss';

function Home() {
  return (
    <section className="home">
      <img src={Logo} className="app-logo" alt="logo" />

      <h1>Welcome to Git Search!</h1>

      <SearchForm />
    </section>
  );
}

export default Home;
