import styled from 'styled-components';
import app from './authentication/firebase';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import AppRouter from './routes/AppRouter';
import GlobalStyles from './GlobalStyles';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyles />
      <WindowSetting>
        <Wrapper>
          <Router>
            <Header />
            <LayoutSidebarAndMainWrapper>
              <Sidebar />
              <AppRouter />
            </LayoutSidebarAndMainWrapper>
          </Router>
        </Wrapper>
      </WindowSetting>
    </>
  );
}

export default App;

{
  /* <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/profile'>Profile</NavLink>
          </li>
          <li>
            <NavLink to='/edit-profile'>EditProfile</NavLink>
          </li>
          <li>
            <NavLink to='/does-not-existe'>W</NavLink>
          </li>
        </ul> */
}

const WindowSetting = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 1360px;
  height: 100vh;
  position: relative;
`;

const LayoutSidebarAndMainWrapper = styled.div`
  display: flex;
`;
