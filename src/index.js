import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { SessionIdProvider } from "./context/SessionIdContext";
import { FavoritProvider } from "./context/FavoriteContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <SessionIdProvider>
        <FavoritProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FavoritProvider>
      </SessionIdProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
