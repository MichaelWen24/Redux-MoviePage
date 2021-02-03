import React, { useState, useEffect } from "react";
import { FetchMovies } from "./FetchEverything";
import Button from "./Button";
import styled from "styled-components";
import MovieContianer from "./MovieContainer";
// import { connect } from 'react-redux';

const MoviesPage = (props) => {
  const [movieList, setMovieList] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(500);

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
      const data = await FetchMovies(category, page);
      setMovieList(data.results);
      setTotalPage(data.total_pages);
    };
    fetchData();
  }, [category, page]);

  return (
    <div className={props.className}>
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
        {movieList.map(({ id, poster_path, title, vote_average }) => {
            return(
                <MovieContianer key={id} id={id} poster_path={poster_path} title={title} vote_average={vote_average}/>
            );
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
