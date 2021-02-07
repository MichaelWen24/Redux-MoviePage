import React, { useState, useContext, createContext } from "react";
import { UserContext } from "../context/UserContext";
import { SessionIdContext } from "../context/SessionIdContext";
import { postFavoriteMovie } from "../components/FetchEverything";

export const FavoriteContext = createContext();

export const FavoritProvider = (props) => {
  const [favoriteList, setFavoriteList] = useState([]);
  const { user } = useContext(UserContext);
  const { sessionId } = useContext(SessionIdContext);

  const isFavorite = (id) => {
    if (favoriteList !== []) {
      return favoriteList.some((movie) => movie.id === id);
    } else {
      return;
    }
  };

  const handleToggleFavorite = (movie) => {
      if(user.name !== "") {
        const favoriteBody = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              media_type: "movie",
              media_id: movie.id,
              favorite: true,
            }),
          };
      
          const unfavoriteBody = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              media_type: "movie",
              media_id: movie.id,
              favorite: false,
            }),
          };
          if (isFavorite(movie.id)) {
            const newFavoriteList = favoriteList.filter((favMovie) => {
              return favMovie.id !== movie.id;
            });
            setFavoriteList(newFavoriteList);
            postFavoriteMovie(user.id, sessionId, unfavoriteBody);
          } else {
            const newFavoriteList = [...favoriteList, movie];
            postFavoriteMovie(user.id, sessionId, favoriteBody);
            setFavoriteList(newFavoriteList);
          }
      }
      else {
          alert("Please Login")
      }
  };

  const useFavorite = {
    favoriteList,
    setFavoriteList,
    isFavorite,
    handleToggleFavorite,
  };

  return (
    <FavoriteContext.Provider value={useFavorite}>
      {props.children}
    </FavoriteContext.Provider>
  );
};
