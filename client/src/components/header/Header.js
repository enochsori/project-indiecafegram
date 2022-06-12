import { Route, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../UserContext';
import { CafeContext } from '../CafeContext';
import { getAuth, signOut } from 'firebase/auth';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AiOutlineLogout } from 'react-icons/ai';
const Header = () => {
  const { currentUser, setStatus, setIsLoggedIn, setUserId } =
    useContext(UserContext);
  const { setIsSelected } = useContext(CafeContext);
  const auth = getAuth();

  const logoutHandler = async () => {
    // Call signout from firebase
    await signOut(auth);
    // Delete localstorage data
    window.localStorage.removeItem('userId');
    setUserId(null);
    setIsLoggedIn(false);
    setStatus('loading');
    setIsSelected(false);
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <StyledNavLink to='/'>
          <Title>Indicafegram</Title>
        </StyledNavLink>
        {currentUser && <Greeting> Welcome, {currentUser[0].name}</Greeting>}

        <StyledNavLink to='/profile'>
          <StyledIoPersonCircleOutline />
          <ProfileLable>Profile</ProfileLable>
        </StyledNavLink>

        <LogoutButton onClick={logoutHandler}>
          <StyledAiOutlineLogout />
          <LogoutLable>Log out</LogoutLable>
        </LogoutButton>
      </ContentWrapper>
    </Wrapper>
  );
};
export default Header;

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  position: fixed;
  left: 0;
  background-color: #fff;
  z-index: 10;

  z-index: 100;
`;
const ContentWrapper = styled.div`
  border: 1px solid blue;
  z-index: 90;
  background-color: #fff;
  position: fixed;
  height: 68px;
  width: 1250px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  position: relative;
`;

const StyledIoPersonCircleOutline = styled(IoPersonCircleOutline)`
  font-size: 2.1rem;
  color: black;
`;

const Title = styled.span`
  font-size: 2.2rem;
  font-weight: bold;
  /* text-transform: uppercase; */
  color: black;
`;
const Greeting = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const ProfileLable = styled.span`
  text-transform: uppercase;
  position: absolute;
  display: inline-block;
  width: 90px;
  height: 50px;
  padding: 38px 0 0 0;
  font-size: 0.8rem;
  font-weight: bold;
  bottom: -15px;
  left: 0;
  opacity: 0;
  transition: all 300ms ease-in;
  &:hover {
    opacity: 1;
    transform: translateY(-12px);
  }
`;
const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  height: 40px;
  width: 30px;
  position: relative;
  cursor: pointer; ;
`;
const LogoutLable = styled.span`
  text-transform: uppercase;
  position: absolute;
  display: inline-block;
  width: 90px;
  height: 50px;
  padding: 38px 0 0 0;
  font-size: 0.8rem;
  font-weight: bold;
  bottom: -15px;
  left: 0;
  opacity: 0;
  transition: all 300ms ease-in;
  &:hover {
    opacity: 1;
    transform: translateY(-12px);
  }
`;

const StyledAiOutlineLogout = styled(AiOutlineLogout)`
  font-size: 1.8rem;
`;

const menuWrapper = styled.ul``;
