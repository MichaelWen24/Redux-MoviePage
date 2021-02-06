import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { SessionIdProvider } from "./context/SessionIdContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <SessionIdProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SessionIdProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
