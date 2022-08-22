import logo from './logo.svg';
import SearchForm from './components/search-form/search-form';

import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />

        <SearchForm />
      </header>
    </div>
  );
}

export default App;
