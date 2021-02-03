import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className={props.className}>
      <div className="title-container">
        <div className="logo">
          <img
            className="logo-img"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          />
        </div>
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <div className="home-title">
            <h5>HOME</h5>
          </div>
        </Link>
        <Link to={`/favorite`} style={{ textDecoration: "none" }}>
          <div className="favorite-title">
            <h5>FAVORITE</h5>
          </div>
        </Link>
        <Link to={`/rated`} style={{ textDecoration: "none" }}>
          <div className="rated-title">
            <h5>RATED</h5>
          </div>
        </Link>
      </div>
      <Link to={`/login`} style={{ textDecoration: "none" }}>
        <div className="account">
          <h6>Login</h6>
        </div>
      </Link>
    </div>
  );
}

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  background-color: rgb(3, 37, 65);
  color: #fff;

  h5,
  h6 {
    color: white;
  }

  h5:hover,
  h6:hover {
    color: rgb(200, 200, 200);
  }

  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    padding-left: 50px;
    padding-top: 15px;
    width: 100px;
    height: 100px;
  }

  .home-title,
  .favorite-title,
  .rated-title {
    padding-left: 30px;
  }

  .account {
    padding-right: 30px;
  }
`;

export default StyledHeader;
