import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './features/home/home';
import Search from './features/search/search';
import Navbar from './components/navbar/navbar';

import './App.scss';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
