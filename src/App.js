import './App.css';
import Layout from './components/Layout';
import Background from './maxresdefault.jpg';
import {moviesContext} from './context/moviesContext';
import { useState } from 'react';
function App() {
  const [movies, setMovies] = useState({results: []});
  const [movie, setMovie] = useState({});
 
  return (
    <div style={{backgroundSize: 'cover', backgroundImage: `url(${Background})`}}>
      <moviesContext.Provider value={{movie: movie, movies : movies.results, setMovies: setMovies, setMovie: setMovie}}>
      <Layout/>
      </moviesContext.Provider>
    </div>
  );
}

export default App;
