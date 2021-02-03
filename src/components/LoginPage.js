import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import styled from "styled-components";

const API_KEY = "f7b946d6ee4e6d5684eae0ca10ca98e4";

const LoginPage = (props) => {
  const [user, setUser] = useState({ username: "", password: "", valid: "" });
  const [token, setToken] = useState([]);
  const [sessionID, setsessionID] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const accountRequestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        request_token: token,
      }),
    };

    //valid account and token
    const accountResponse = await fetch(
      `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
      accountRequestBody
    );
    const accountData = await accountResponse.json();
    console.log(accountData)
    const validAccount = accountData.success; //true
    setUser({ ...user, valid: validAccount });

    //request session id
    // if (user.valid) {
    //   const sessionRequestBody = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       request_token: token,
    //     }),
    //   };

    //   const sessionIdResponse = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`, sessionRequestBody);
    //   const sessionIdData = await sessionIdResponse.json();
    //   setsessionID(sessionIdData.session_id)
    // }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
      );
      const data = await response.json();
      setToken(data.request_token);
    };
    fetchToken();

    const fetchSessionId = async () => {
        const sessionRequestBody = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            request_token: token,
          }),
        };
        const sessionIdResponse = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`, sessionRequestBody);
        const sessionIdData = await sessionIdResponse.json();
        console.log(sessionIdData)
        setsessionID(sessionIdData.session_id);
      }
      
    if(user.valid === true) {
      fetchSessionId() 
    }
  }, [user.valid]);

  return (
    <div className={props.className}>
      <h3>Login</h3>
      <p
        className="login-error "
        style={{ display: user.valid===false ? "block" : "none" }}
      >
        Fail to login. Please check your username and password.
      </p>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="username-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="username-input"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
          />
        </div>
        <div className="password-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="password-input"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
          />
        </div>
        <div className="submit-container">
          <button className="submit-button" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

const StyledLoginPage = styled(LoginPage)`
  width: 100vw;
  margin: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 3rem;
    font-weight: 400;
    line-height: 1.167;
    letter-spacing: 0em;
    margin-bottom: 20px;
  }

  input {
    height: 25px;
  }

  .login-error {
    color: red;
  }

  .login-form {
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .username-container,
  .password-container {
    width: 100%;
    margin: 5px;
    display: flex;
    flex-direction: column;
  }

  .submit-container {
    width: 100%;
    margin-top: 15px;
  }

  .submit-button {
    width: 480px;
    background-color: rgb(1, 180, 228);
    border: none;
    color: white;
    border-radius: 5px;
    padding: 8px 10px;
    font-size: 16px;
    cursor: pointer;
  }

  .submit-button:hover {
    background-color: rgb(144, 206, 161);
    transition: 0.3s;
  }
`;
// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
export default StyledLoginPage;
