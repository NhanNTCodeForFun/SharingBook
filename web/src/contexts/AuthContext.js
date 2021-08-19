import React, { useState } from "react";
import * as userServices from "../services/user-services";

export const UserApiContext = React.createContext();

const AuthContext = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLogout, setLogout] = useState(false);

  const logout = () => {
    setLogout(true);
  };

  return (
    <UserApiContext.Provider
      value={{ currentUser, isLogout, setCurrentUser, logout }}
    >
      {props.children}
    </UserApiContext.Provider>
  );
};

export default AuthContext;
