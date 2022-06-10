import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../components/authentication/firebase';
import { getAuth } from 'firebase/auth';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [state, setState] = useState('loading');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const auth = getAuth();

  // console.log('current user is:', currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user.uid);
        setIsLoggedIn(true);
        if (user.uid) {
          const fetchUserInfo = async () => {
            try {
              const res = await fetch(`/api/users/${user.uid}`);
              const { data } = await res.json();
              setCurrentUser(data);
            } catch (err) {
              console.log('database error');
            }
          };
          fetchUserInfo();
        }
      } else {
        setIsLoggedIn(false);
      }
      setState('idle');
    });
  }, []);

  // [POST] Register new user info into database
  useEffect(() => {
    if (newUser) {
      // console.log(newUser);
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
