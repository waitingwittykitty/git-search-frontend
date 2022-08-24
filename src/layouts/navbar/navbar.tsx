import { NavLink, useLocation } from 'react-router-dom';

import SearchForm from '../../components/search-form/search-form';
import Logo from '../../logo.svg';

import './navbar.scss';

export interface NavbarProps {
  children?: React.ReactNode;
}

function Navbar({ children }: NavbarProps) {
  const location = useLocation();

  const shouldShowSearchForm = location.pathname === '/search';

  return (
    <nav className="navbar">
      <img height="36" src={Logo} className="navbar-logo" alt="logo" />

      {shouldShowSearchForm && <SearchForm />}

      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
