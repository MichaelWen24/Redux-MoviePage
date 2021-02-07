import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { SessionIdContext } from "../context/SessionIdContext";
import MovieContainer from "../components/MovieContainer";
import styled from "styled-components";
import { fetchRatedMovie } from "../components/FetchEverything";
import { LoadingContext } from "../context/LoadingContext";
// import { connect } from 'react-redux'

export const RatedPage = (props) => {
  const { user } = useContext(UserContext);
  const { sessionId } = useContext(SessionIdContext);
  const [ratedList, setRatedList] = useState([]);
  const { isloading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (user.name !== "") {
      fetchRatedMovie(user.id, sessionId).then((data) => {
        setLoading(true);
        setRatedList(data.results);
        setLoading(false);
      });
    }
  }, []);

  return (
    <div className={props.className}>
      {isloading && <h2>Loading</h2>}
      <h2 className="title">Rated Page</h2>
      {user.name !== "" ? (
        <div className="rated-page">
          {ratedList.map((movie) => {
            return <MovieContainer key={movie.id} movie={movie} />;
          })}
        </div>
      ) : (
        <h2 className="title">Please Login to See Your Rated Page</h2>
      )}
    </div>
  );
};

const StyledRatedPage = styled(RatedPage)`
  .title {
    margin-top: 32px;
    text-align: center;
    align-items: center;
    font-size: 32px;
  }

  .rated-page {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(4, 1fr);
    margin: 0px 32px 32px 32px;
  }
`;

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

export default StyledRatedPage;
