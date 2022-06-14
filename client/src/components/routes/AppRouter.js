import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import styled from 'styled-components';

import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Auth from '../routes/Auth';
import EditProfile from '../routes/EditProfile';
import Chat from './Chat';

const AppRouter = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Wrapper>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home /> : <Auth />}></Route>

        <Route path='/chat' element={isLoggedIn ? <Chat /> : <Auth />}></Route>
        <Route
          path='/profile'
          element={isLoggedIn ? <Profile /> : <Auth />}
        ></Route>

        <Route path='/edit-profile' element={<EditProfile />}></Route>
      </Routes>
    </Wrapper>
  );
};

export default AppRouter;

const Wrapper = styled.div`
  width: 100%;
`;
