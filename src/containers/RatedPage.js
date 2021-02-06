import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { SessionIdContext } from "../context/SessionIdContext";
import MovieContainer from "../components/MovieContainer"
import styled from "styled-components";
// import { connect } from 'react-redux'

export const RatedPage = (props) => {

  const { user } = useContext(UserContext);
  const { sessionId } = useContext(SessionIdContext);
  const [ratedList, setRatedList] = useState([]);

  useEffect(() => {
      
  })

  return (
  <div className={props.className}>
      <div className="favorite-page">
        {ratedList.map(({ id, poster_path, title, vote_average }) => {
            return(
                <MovieContainer key={id} id={id} poster_path={poster_path} title={title} vote_average={vote_average}/>
            );
        })}
      </div>
  </div>
  )
};

const StyledRatedPage = styled(RatedPage)`
.favorite-page {
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