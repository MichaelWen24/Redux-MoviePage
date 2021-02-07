import React, { useState, useContext, createContext } from "react";
import { UserContext } from "../context/UserContext";
import { SessionIdContext } from "../context/SessionIdContext";


//

// NOT IN USE

//

export const RatedContext = createContext();

export const RatedProvider = (props) => {
  const [ratedList, setRatedList] = useState([]);
  const { user } = useContext(UserContext);
  const { sessionId } = useContext(SessionIdContext);

  const useRated = {
    ratedList,
    setRatedLiist
  };

  return (
    <RatedContext.Provider value={useRated}>
      {props.children}
    </RatedContext.Provider>
  );
};
