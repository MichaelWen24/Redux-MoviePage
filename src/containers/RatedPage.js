import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { SessionIdContext } from "../context/SessionIdContext";
import MovieContainer from "../components/MovieContainer"
import styled from "styled-components";
import { fetchRatedMovie } from "../components/FetchEverything";
// import { connect } from 'react-redux'

export const RatedPage = (props) => {

  const { user } = useContext(UserContext);
  const { sessionId } = useContext(SessionIdContext);
  const [ratedList, setRatedList] = useState([]);

  useEffect(() => {
      if (user.name !== ""){
          fetchRatedMovie(user.id, sessionId).then((data) => {
              setRatedList(data.results);
          })
      }
  }, [])

  return (
  <div className={props.className}>
      <h2 className="title">Rated Page</h2>
      <div className="rated-page">
        {/* {ratedList.map(({ id, poster_path, title, vote_average, rating }) => {
            return(
                <MovieContainer key={id} id={id} poster_path={poster_path} title={title} vote_average={vote_average} rating={rating}/>
            );
        })} */}
           {ratedList.map((movie) => {
            return(
                <MovieContainer key={movie.id} movie={movie} />
            );
        })}
      </div>
  </div>
  )
};

const StyledRatedPage = styled(RatedPage)`
.title {
    margin-top: 32px;
    text-align:center;
    align-items:center;
    font-size:32px;
}

.rated-page {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(4, 1fr);
    margin: 0px 32px 32px 32px;
  }
`

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

export default StyledRatedPage;