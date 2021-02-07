import React, { useState, createContext } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = (props) => {
  const [isloading, setLoading] = useState(false);

  const useLoading = {
    isloading,
    setLoading
  };

  return (
    <LoadingContext.Provider value={useLoading}>
      {props.children}
    </LoadingContext.Provider>
  );
};
