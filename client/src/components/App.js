import styled from 'styled-components';
import app from './authentication/firebase';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import AppRouter from './routes/AppRouter';
import GlobalStyles from './GlobalStyles';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <LayoutWrapper>
      <GlobalStyles />

      <WindowSetting>
        <Wrapper>
          <Router>
            <Header />
            <LayoutSidebarAndMainWrapper>
              <AppRouter />
              <Sidebar />
            </LayoutSidebarAndMainWrapper>
          </Router>
        </Wrapper>
      </WindowSetting>
    </LayoutWrapper>
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

const LayoutWrapper = styled.div``;
const WindowSetting = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 1200px;
  height: 100vh;
`;

const LayoutSidebarAndMainWrapper = styled.div`
  display: flex;
`;
