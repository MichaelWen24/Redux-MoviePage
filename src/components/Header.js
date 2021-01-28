import React from "react";
import styled from "styled-components";

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
        <div className="home-title">
          <h5>HOME</h5>
        </div>
        <div className="favorite-title">
          <h5>FAVORITE</h5>
        </div>
        <div className="rated-title">
          <h5>RATED</h5>
        </div>
      </div>
      <div className="account">
        <h6>ACCOUNT</h6>
      </div>
    </div>
  );
}

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  background-color:#3f51b5;
  color: #fff;

  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    padding-left:50px;
    padding-top:15px;
    width: 100px;
    height: 100px;
  }

  .home-title, .favorite-title, .rated-title {
    padding-left: 30px;
  }

  .account {
    padding-right: 30px;
  }
`;

export default StyledHeader;
