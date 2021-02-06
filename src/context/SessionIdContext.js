import React, { useState, createContext } from 'react'

export const SessionIdContext = createContext();

export const SessionIdProvider = (props) => {

    const [sessionId, setSessionId] = useState("");

    const useSessionId = {
        sessionId,
        setSessionId
    }

    return (
        <SessionIdContext.Provider value={useSessionId}>
            {props.children}
        </SessionIdContext.Provider>
     )
}
