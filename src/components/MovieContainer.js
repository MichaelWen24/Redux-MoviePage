import React from "react";
import { IoIosHeartEmpty, IoMdHeart, IoIosStar } from "react-icons/io";
import styled from "styled-components";
import { connect } from "react-redux";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieContainer = ({
  className,
  id,
  poster_path,
  title,
  vote_average,
}) => {
  return (
    <div className={className}>
      <div className="movie-container" id={id}>
        <img className="movie-image" src={`${IMAGE_URL}/${poster_path}`} />
      </div>
      <button className="title-button">
        <div className="title-div">
          <h2 className="movie-title">{title}</h2>
        </div>
      </button>
      <div className="icon-area">
        <IoIosStar color="yellow" />
        <IoIosHeartEmpty color="grey" />
      </div>
    </div>
  );
};

const StyledMovieContainer = styled(MovieContainer)`
  .movie-container {
    /* width: 300px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .movie-image {
    width: 100%;
  }

  .title-button {
    width: 100%;
    height: 80px;
    color: inherit;
    border: 0;
    cursor: pointer;
    margin: 0;
    display: inline-flex;
    outline: 0;
    padding: 0;
    position: relative;
    align-items: center;
    border-radius: 0;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: transparent;
  }
`;

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

export default StyledMovieContainer;
