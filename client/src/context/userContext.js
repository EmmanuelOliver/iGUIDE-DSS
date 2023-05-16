import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userType, setUserType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <UserContext.Provider
      value={{ userType, setUserType, firstName, setFirstName, lastName, setLastName }}
    >
      {props.children}
    </UserContext.Provider>
  );
};


