import './App.css';
import Header from "./components/Header";
import Button from "./components/Button";
import MoviePage from "./components/MoviesPage";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <Header/>
      <MoviePage/>
    </div>
  );
}

export default App;
