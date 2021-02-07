import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { SessionIdContext } from "../context/SessionIdContext";
import MovieContainer from "../components/MovieContainer";
import styled from "styled-components";
import { fetchFavoriteMovie } from "../components/FetchEverything";
import { FavoriteContext } from "../context/FavoriteContext";
// import { connect } from 'react-redux'

export const FavoritePage = (props) => {
  const { user } = useContext(UserContext);
  const { sessionId } = useContext(SessionIdContext);
  const { favoriteList, setFavoriteList } = useContext(FavoriteContext);

  useEffect(() => {
    if (user.name !== "") {
      fetchFavoriteMovie(user.id, sessionId).then((data) => {
        setFavoriteList(data.results);
      });
    }
  }, []);

  return (
    <div className={props.className}>
      <h2 className="title">Favorite Page</h2>
      {user.name !== "" ? (
        <div className="favorite-page">
          {favoriteList.map((movie) => {
            return <MovieContainer key={movie.id} movie={movie} />;
          })}
        </div>
      ) : (
        <h2 className="title">Please Login to See Your Favorite Page</h2>
      )}
    </div>
  );
};

const StyledFavoritePage = styled(FavoritePage)`
  .title {
    margin-top: 32px;
    text-align: center;
    align-items: center;
    font-size: 32px;
  }

  .favorite-page {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(4, 1fr);
    margin: 32px 32px 32px 32px;
  }
`;

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

export default StyledFavoritePage;
