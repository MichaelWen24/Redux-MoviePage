import React, { useState, useEffect, useContext } from "react";
import {
  fetchDetails,
  fetchRatedMovie,
  postRatedMovie,
} from "../components/FetchEverything";
import { IoIosStar } from "react-icons/io";
import Button from "../components/Button";
import { UserContext } from "../context/UserContext";
import { SessionIdContext } from "../context/SessionIdContext";
import styled from "styled-components";
import { LoadingContext } from "../context/LoadingContext";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const DetailsPage = (props) => {
  const [details, setDetails] = useState([]);
  const [rating, setRating] = useState(0);
  const [curRating, setCurRating] = useState(0);
  const { user } = useContext(UserContext);
  const { sessionId } = useContext(SessionIdContext);
  const { isloading, setLoading } = useContext(LoadingContext);

  const FetchDetails = async (id) => {
    const data = await fetchDetails(id);
    setDetails(data);
    return data;
  };

  const handleRating = () => {
    const ratingValue = curRating;
    const ratingRequestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value: ratingValue,
      }),
    };
    setRating(ratingValue);
    postRatedMovie(details.id, sessionId, ratingRequestBody).then((resp) => {
      // if rated success, what message will show
    });
  };

  useEffect(() => {
    const movieId = props.match.params.movieId;
    setLoading(true);
    FetchDetails(movieId).then(({ id }) => {
      if(user.id !=="" && sessionId !== "") {
        fetchRatedMovie(user.id, sessionId).then(({ results }) => {
          console.log(results)
          setLoading(false);
          results.find((movie) => {
            if (movie.id === id) {
              setRating(movie.rating);
              return;
            }
          });
        });
      } else {
        setLoading(false);
        return;
      }
    });
  }, []);

  return (
    <div className={props.className}>
      {isloading && <h2>Loading</h2>}
      <div className="detail-img">
        <img src={`${IMAGE_URL}/${details.poster_path}`} />
      </div>
      <div className="detial-info">
        <div className="detail-title">
          <h2 className="title">{details.title}</h2>
          <br />
        </div>
        <div className="detail-data">
          <h3>Release Date:</h3>
          <p className="release-date">{details.release_date}</p>
        </div>
        <div className="detail-overview">
          <h3>Overview:</h3>
          <p className="overview">{details.overview}</p>
        </div>
        <div className="detail-genres">
          <h3>Genres:</h3>
          <div className="genre-container">
            {details.genres ? (
              details.genres.map((genre) => {
                return <label className="genre-item" key={genre.id}>{genre.name}</label>;
              })
            ) : (
              <label> genres null</label>
            )}
          </div>
        </div>
        <div className="detail-rating">
          <h3>Average Rating:</h3>
          <div className="rating-area">
            <IoIosStar className="star-icon" />
            <p>{details.vote_average}</p>
          </div>
        </div>
        <div className="datail-your-rating">
          <h3>Your Rating:</h3>
          {rating === undefined ? (
            <p className="rating">0</p>
          ) : (
            <p className="rating">{rating} </p>
          )}
          <div className="your-rating-area">
            <select
              className="your-rating"
              defaultValue="1"
              onChange={(e) => setCurRating(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <Button className="rating-button" onClick={handleRating}>
              RATE IT!
            </Button>
          </div>
        </div>
        <div className="detail-company">
          <h3>Production companies:</h3>
          <div className="company-container">
            {details.production_companies ? (
              details.production_companies.map((company) => {
                return (
                  <div className="company" key={company.id}>
                    <img
                      className="company-image"
                      src={`${IMAGE_URL}/${company.logo_path}`}
                    />
                    <p>{company.name}</p>
                  </div>
                );
              })
            ) : (
              <div>Company error</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StyledDetailsPage = styled(DetailsPage)`
  display: flex;
  flex-direction: row;
  padding: 40px;
  align-items: center;
  margin-left: 128px;
  margin-right: 128px;
  justify-content: center;

  .detail-title,
  .detail-data,
  .detail-overview,
  .detail-genres,
  .detail-rating,
  .datail-your-rating,
  .detail-company {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .detial-info h3 {
    margin-bottom: 0.35em;
  }

  .detail-image {
    width: 400px;
    flex-basis: 50%;
  }

  .detial-info {
    margin-left: 32px;
  }

  .title {
    font-size: 3rem;
  }

  .overview {
    max-height: 100px;
    overflow-y: scroll;
  }

  .genre-item {
    color: white;
    height: 32px;
    margin-right: 5px;
    display: inline-flex;
    padding: 10px;
    box-sizing: border-box;
    align-items: center;
    border-radius: 16px;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: rgb(1, 180, 228);
  }

  .rating-area {
    display: flex;
  }

  .star-icon {
    color: rgb(245, 197, 24);
    font-size: 20px;
    margin-right: 3px;
  }

  .your-rating {
    margin-right: 10px;
    cursor: pointer;
  }

  .rating-button {
    font-size: 15px;
    padding: 5px 10px;
  }

  .company-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .company {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .company-image {
    width: 40px;
    height: 40px;
  }
`;

export default StyledDetailsPage;
