import React, { useState, useEffect } from "react";
import { FetchDetails } from "../components/FetchEverything";
import { IoIosStar } from "react-icons/io";
import Button from "./Button";
// import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const DetailsPage = (props) => {
  const [details, setDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const movieId = props.match.params.movieId;
    const fetchDetails = async () => {
      const data = await FetchDetails(movieId);
      console.log(data);
      setDetails(data);
      setGenres(data.genres);
      setCompanies(data.production_companies);
    };
    fetchDetails();
  }, []);

  return (
    <div className={props.className}>
      <div class="detail-img">
        <img src={`${IMAGE_URL}/${details.poster_path}`} />
      </div>
      <div class="detial-info">
        <div className="detail-title">
          <h2 className="title">{details.title}</h2>
          <br />
        </div>
        <div className="detail-data">
          <h3>Release Date:</h3>
          <p class="release-date">{details.release_date}</p>
        </div>
        <div className="detail-overview">
          <h3>Overview:</h3>
          <p class="overview">{details.overview}</p>
        </div>
        <div className="detail-genres">
          <h3>Genres:</h3>
          <div class="genre-container">
            {genres.map((genre) => {
              return <label class="genre-item">{genre.name}</label>;
            })}
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
          <div className="your-rating-area">
            <select className="your-rating"defaultValue="1">
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
            <Button className="rating-button">RATE IT!</Button>
          </div>
        </div>
        <div className="detail-company">
          <h3>Production companies:</h3>
          <div class="company-container">
            {companies.map((company) => {
              console.log(company);
              return (
                <div class="company">
                  <img
                    className="company-image"
                    src={`${IMAGE_URL}/${company.logo_path}`}
                  />
                  <p>{company.name}</p>
                </div>
              );
            })}
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
