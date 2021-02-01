import React from "react";
import { IoIosHeartEmpty, IoMdHeart, IoIosStar } from "react-icons/io";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
        <img
          className="movie-image"
          src={
            poster_path !== null
              ? `${IMAGE_URL}/${poster_path}`
              : "https://t4.ftcdn.net/jpg/02/07/87/79/360_F_207877921_BtG6ZKAVvtLyc5GWpBNEIlIxsffTtWkv.jpg"
          }
        />
        <Link to={`movies/${id}`} style={{ textDecoration: "none" }}>
          <button className="title-button">
            <h2 className="movie-title">{title}</h2>
          </button>
        </Link>
        <div className="icon-area">
          <div className="star-div">
            <IoIosStar className="star-icon" />
            <p className="vote">{vote_average}</p>
          </div>
          <div className="heart-div">
            <IoIosHeartEmpty className="heart-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StyledMovieContainer = styled(MovieContainer)`
  .movie-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 5px 5px 5px 5px #888888;
  }

  .movie-image {
    width: 100%;
  }

  .title-button {
    width: 100%;
    height: 80px;
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
    background-color: transparent;
  }

  .title-button:hover {
    background-color: rgb(240, 240, 240);
    transition: 0.3s;
  }

  .star-icon {
    color: rgb(245, 197, 24);
    font-size: 20px;
    margin-right: 3px;
  }

  .star-div {
    margin-left: 5px;
    display: flex;
    align-items: center;
  }

  .heart-icon {
    color: grey;
    font-size: 20px;
  }

  .heart-div {
    margin-right: 5px;
  }

  .icon-area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

export default StyledMovieContainer;
