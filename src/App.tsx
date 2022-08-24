import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Favorites from './features/favorites/favorites';
import Home from './features/home/home';
import Search from './features/search/search';
import Navbar from './layouts/navbar/navbar';

import './App.scss';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
