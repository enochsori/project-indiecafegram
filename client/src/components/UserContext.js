import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [status, setStatus] = useState('loading');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const savedId = window.localStorage.getItem('userId');
    if (savedId) {
      setUserId(savedId);
    }
  }, []);

  // [Login process]
  // Fetch to grab current user info from db
  // Set currentUser state to fire another useEffect to change login status
  useEffect(() => {
    if (userId) {
      // Fetch to get current user info from mongoDB
      const fetchUserInfo = async () => {
        try {
          const res = await fetch(`/api/users/${userId}`);
          const userData = await res.json();
          if (userData) {
            const { data } = userData;
            setCurrentUser(data[0]);
          }
        } catch (err) {
          console.log('database error');
          setIsLoggedIn(false);
          setCurrentUser(null);
          setStatus('loading');
        }
      };
      fetchUserInfo();
    }
  }, [userId]);

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
      setStatus('idle');
    }
  }, [currentUser]);

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
          console.log('new user', data[0]);
          if (data[0]._id === newUser._id) {
            setUserId(data[0]._id);
          }
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
        userId,
        setUserId,
        setStatus,
        status,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
