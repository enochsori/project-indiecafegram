import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import styled from 'styled-components';

import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Auth from '../routes/Auth';
import EditProfile from '../routes/EditProfile';

const AppRouter = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Wrapper>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Home />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/edit-profile' element={<EditProfile />}></Route>
          </>
        ) : (
          <Route path='/' element={<Auth />}></Route>
        )}
      </Routes>
    </Wrapper>
  );
};

export default AppRouter;

const Wrapper = styled.div`
  width: 100%;
`;
