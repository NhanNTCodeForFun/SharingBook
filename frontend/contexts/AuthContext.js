import React, {useState} from 'react';
import * as userServices from '../services/user-services';

export const UserApiContext = React.createContext();

const BookDataContext = props => {
  const [currentUser, setCurrentUser] = useState();
  const [isLogout, setLogout] = useState(false);

  const login = async account => {
    const result = await userServices.login(account);
    if (result) {
      setLogout(false);
      setCurrentUser(result);
    } else {
      setCurrentUser(result);
    }
  };

  const updateUser = async () => {
    const result = await userServices.getUser(currentUser.memberId);
    if (result) {
      setCurrentUser(result);
    }
  };

  const logout = () => {
    setLogout(true);
  };

  return (
    <UserApiContext.Provider
      value={{currentUser, isLogout, login, logout, updateUser}}>
      {props.children}
    </UserApiContext.Provider>
  );
};

export default BookDataContext;
