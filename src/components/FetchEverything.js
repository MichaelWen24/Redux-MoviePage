const BASE_URL = "https://api.themoviedb.org/3/movie/";

const API_KEY = "f7b946d6ee4e6d5684eae0ca10ca98e4";

const fetchMovies = (category, page) => {
  category = typeof category !== "undefined" ? category : "popular";
  page = typeof page !== "undefined" ? page : "1";

  return fetch(`${BASE_URL}${category}?api_key=${API_KEY}&page=${page}`).then(
    (resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        console.log("Movies fetching error");
      }
    }
  );
};

const fetchDetails = (id) => {
  return fetch(`${BASE_URL}${id}?api_key=${API_KEY}`).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log("Details fetching error");
    }
  });
};

const fetchToken = () => {
  return fetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
  ).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log("Token fetching error");
    }
  });
};

const validAccount = (body) => {
  return fetch(
    `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
    body
  ).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      alert("Verifying account error");
    }
  });
};

const fetchSessionId = (body) => {
  return fetch(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
    body
  ).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log("Fetching Session Id error");
    }
  });
};

const fetchAccountDetails = (sessionID) => {
  return fetch(
    `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionID}`
  ).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log("Fetching Account details error");
    }
  });
};

const fetchFavoriteMovie = (accountId, sessionId) => {
  return fetch(
    `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&sort_by=created_at.asc`
  ).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log("Fetching Favorite List error");
    }
  });
};

const postFavoriteMovie = (accountId, sessionId, requestBody) => {
  return fetch(
    `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
    requestBody
  ).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log("POST Favorite List error");
    }
  });
};

const fetchRatedMovie = (accountId, sessionId) => {
  return fetch(
    `https://api.themoviedb.org/3/account/${accountId}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}&sort_by=created_at.asc`
  ).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log("Fetching Rated List error");
    }
  });
};

const postRatedMovie = (movieId, sessionId) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`
  ).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log("Post rate error");
    }
  });
};

export {
  fetchDetails,
  fetchMovies,
  fetchToken,
  validAccount,
  fetchSessionId,
  fetchAccountDetails,
  fetchFavoriteMovie,
  postFavoriteMovie,
  fetchRatedMovie,
  postRatedMovie
};
