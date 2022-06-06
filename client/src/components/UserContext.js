import { createContext, useEffect, useState } from 'react';
import app from '../components/authentication/firebase';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  const [newUser, setNewUser] = useState(null);

  // [GET] Get current user info from databas
  // useEffect(() => {
  //   if (window.sessionStorage.getItem('userId')) {
  //     isLoggedIn(true);
  //     const id = window.sessionStorage.getItem('userId');
  //     const fetchUserInfo = async () => {
  //       try {
  //         const res = await fetch(`/api/users/${id}`);
  //         const { data } = await res.json();
  //         console.log(data);
  //         setCurrentUser(data);
  //       } catch (err) {
  //         console.log('database error');
  //       }
  //     };
  //     fetchUserInfo();
  //   }
  // }, []);

  // [POST] Register new user info into database
  useEffect(() => {
    if (newUser) {
      console.log(newUser);
      const newUserRegisterFetch = async () => {
        try {
          const res = await fetch('/api/new-user', {
            method: 'POST',
            body: JSON.stringify({ ...newUser }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          const { data } = await res.json();
          console.log(data);
          setCurrentUser(data);
        } catch (err) {
          window.alert('Serverside Error');
        }
      };
      newUserRegisterFetch();
    }
  }, [newUser]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        newUser,
        setNewUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
