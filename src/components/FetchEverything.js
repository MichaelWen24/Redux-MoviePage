const BASE_URL = "https://api.themoviedb.org/3/movie/";

const API_KEY = "f7b946d6ee4e6d5684eae0ca10ca98e4";

const FetchMovies = (category, page) => {
  category = typeof category !== "undefined" ? category : "popular";
  page = typeof page !== "undefined" ? page : "1";

  return fetch(`${BASE_URL}${category}?api_key=${API_KEY}&page=${page}`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        console.log("Movies fetching error");
      }
    })
    .then((data) =>{
        return data;
    })
}

const FetchDetails = (id) => {
  return fetch(`${BASE_URL}${id}?api_key=${API_KEY}`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        console.log("Companies fetching error");
      }
    })
}

export { FetchDetails, FetchMovies };
