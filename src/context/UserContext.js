import React, { useState, createContext } from 'react'

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState({ name:"", id:"" });
    const [accountName, setAccountName] = useState("");
    // const [user, setUser] = useState(null)

    const useUser = {
        user,
        setUser
    }

    return (
       <UserContext.Provider value={useUser}>
           {props.children}
       </UserContext.Provider>
    )
}
