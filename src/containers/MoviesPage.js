import React, { useState, useEffect, useContext } from "react";
import { fetchMovies } from "../components/FetchEverything";
import Button from "../components/Button";
import styled from "styled-components";
import MovieContainer from "../components/MovieContainer";
import { LoadingContext } from "../context/LoadingContext";
// import { connect } from 'react-redux';

const MoviesPage = (props) => {
  const [movieList, setMovieList] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(500);
  const { isloading, setLoading } = useContext(LoadingContext);

  // movieList = {
  //   category: {
  //     page: {
  //       1:[]
  //       2:[]
  //        ...
  //     }
  //   }
  // }

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchMovies(category, page);
      setMovieList(data.results);
      setTotalPage(data.total_pages);
      setLoading(false);
      sessionStorage.setItem(`${category}${page}`, JSON.stringify(data.results))
    };

    if (sessionStorage.getItem(`${category}${page}`) === null) {
      fetchData();
    }
    else {
      setMovieList(JSON.parse(sessionStorage.getItem(`${category}${page}`)));
    }
  }, [category, page]);

  return (
    <div className={props.className}>
      {isloading && <h2>Loading</h2>}
      <div className="select-area">
        <div className="page-select">
          <Button onClick={handlePrev}> PREV </Button>
          <p>
            {page} / {totalPage}
          </p>
          <Button onClick={handleNext}> NEXT </Button>
        </div>
        <div className="category-grid-container">
          <div className="category-container">
            <label>Category</label>
            <select
              defaultValue="popular"
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="popular">Popular</option>
              <option value="now_playing">Now Playing</option>
              <option value="top_rated">Top Rated</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>
      </div>
      <div className="movie-page">
        {/* {movieList.map(({ id, poster_path, title, vote_average }) => {
            return(
                <MovieContainer key={id} id={id} poster_path={poster_path} title={title} vote_average={vote_average}/>
            );
        })} */}
        {movieList.map((movie) => {
          return <MovieContainer key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage)

const StyledMoviesPage = styled(MoviesPage)`
  .select-area {
    margin: 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .page-select {
    width: 100%;
    grid-column: 2 /3;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .category-grid-container {
    grid-column: 3 / 3;
    display: flex;
    flex-direction: row-reverse;
  }

  .category-container {
    border: 0;
    margin: 0;
    display: inline-flex;
    padding: 0;
    position: relative;
    min-width: 0;
    flex-direction: column;
    vertical-align: top;
  }

  .category-container select {
    height: auto;
    overflow: hidden;
    cursor: pointer;
    min-width: 16px;
    border-radius: 0;
  }

  .movie-page {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(4, 1fr);
    margin: 0px 32px 32px 32px;
  }
`;

export default StyledMoviesPage;
