import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  fetchToken,
  validAccount,
  fetchSessionId,
  fetchAccountDetails,
} from "../components/FetchEverything";
import { UserContext } from "../context/UserContext";
import { SessionIdContext } from "../context/SessionIdContext";
import { FavoriteContext } from "../context/FavoriteContext";
import { fetchFavoriteMovie } from "../components/FetchEverything";

const LoginPage = (props) => {
  const { user, setUser } = useContext(UserContext);
  const { sessionId, setSessionId } = useContext(SessionIdContext);
  const { favoriteList, setFavoriteList } = useContext(FavoriteContext);
  const [token, setToken] = useState([]);
  const [account, setAccount] = useState({
    username: "",
    password: "",
    valid: "",
  });
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    const accountRequestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: account.username,
        password: account.password,
        request_token: token,
      }),
    };

    //valid account and token
    validAccount(accountRequestBody).then((accountData) => {
      const verifyiedAccount = accountData.success;
      setAccount({ ...account, valid: verifyiedAccount });
    });
  };

  const fetchTokenData = async () => {
    const tokenData = await fetchToken();
    setToken(tokenData.request_token);
  };

  const fetchSessionIdData = async () => {
    const sessionRequestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request_token: token,
      }),
    };
    const sessionIdData = await fetchSessionId(sessionRequestBody);
    return sessionIdData.session_id;
  };

  useEffect(() => {
    fetchTokenData();
    if (account.valid === true) {
      fetchSessionIdData().then((sessionID) => {
        console.log("session in main", sessionID);
        setSessionId(sessionID);
        localStorage.setItem("sessionId", sessionID);
        fetchAccountDetails(sessionID)
          .then((accountData) => {
            setUser({ ...user, name: accountData.name });
            setUser({ ...user, id: accountData.id });
            localStorage.setItem("user", accountData.name);
            localStorage.setItem("userId", accountData.id);
            //onLoad
            fetchFavoriteMovie(accountData.id, sessionID).then((data) => {
              setFavoriteList(data.results)
            })
          })
          .then(() => {
              history.push("/");
          });
      });
    }
  }, [account.valid]);

  return (
    <div className={props.className}>
      <h3>Login</h3>
      <p
        className="login-error "
        style={{ display: account.valid === false ? "block" : "none" }}
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
            onChange={(e) =>
              setAccount({ ...account, username: e.target.value })
            }
            value={account.username}
          />
        </div>
        <div className="password-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="password-input"
            onChange={(e) =>
              setAccount({ ...account, password: e.target.value })
            }
            value={account.password}
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
