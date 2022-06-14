import { useNavigate, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../UserContext';
import { CafeContext } from '../CafeContext';
import { getAuth, signOut } from 'firebase/auth';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoChatbubble } from 'react-icons/io5';
import { ChatContext } from '../ChatContext';
const Header = () => {
  const { currentUser, setStatus, setIsLoggedIn, setUserId, setCurrentUser } =
    useContext(UserContext);
  const { setIsSelected, setCenter } = useContext(CafeContext);
  const { setCurrentChat } = useContext(ChatContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    // Call signout from firebase
    await signOut(auth);
    // Delete localstorage data
    window.localStorage.removeItem('userId');
    setCurrentUser(null);
    setUserId(null);
    setIsLoggedIn(false);
    setStatus('loading');
    setIsSelected(false);
    setCurrentChat(null);
    setCenter(null);
    navigate('/');
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <LogoWrapper>
          <StyledNavLink to='/'>
            <Title>Indicafegram</Title>
          </StyledNavLink>
        </LogoWrapper>

        <MenuWrapper>
          <StyledNavLink to='/profile'>
            <StyledIoPersonCircleOutline />
            <ProfileLable>Profile</ProfileLable>
          </StyledNavLink>

          <StyledNavLink to='/chat'>
            <StyledIoChatbubble />
            <ChatLable>Chat</ChatLable>
          </StyledNavLink>

          <LogoutButton onClick={logoutHandler}>
            <StyledAiOutlineLogout />
            <LogoutLable>Log out</LogoutLable>
          </LogoutButton>

          <GreetingWrapper>
            {currentUser ? (
              <>
                <Greeting> Welcome,</Greeting>{' '}
                <Greeting> {currentUser.name}</Greeting>
              </>
            ) : (
              <Greeting></Greeting>
            )}
          </GreetingWrapper>
        </MenuWrapper>
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
  z-index: 100;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;
const ContentWrapper = styled.div`
  z-index: 90;
  background-color: #fff;
  position: fixed;
  height: 68px;
  width: 1250px;
  display: flex;
  align-items: center;
  display: flex;
  align-items: flex-end;
  padding-bottom: 7px;
`;
const LogoWrapper = styled.div`
  flex: 6;
  padding-bottom: 3px;
`;
const MenuWrapper = styled.div`
  
  flex: 6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pa
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
  color: black;
`;
const GreetingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
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
  bottom: -18px;
  left: -10px;
  color: black;
  opacity: 0;
  transition: all 300ms ease-in;
  &:hover {
    opacity: 1;
    transform: translateY(-11px);
  }
`;
const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  height: 40px;
  width: 30px;
  position: relative;
  cursor: pointer;
  margin: 0 30px;
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
  bottom: -14px;
  left: -22px;
  opacity: 0;
  transition: all 300ms ease-in;
  &:hover {
    opacity: 1;
    transform: translateY(-10px);
  }
`;

const StyledIoChatbubble = styled(IoChatbubble)`
  font-size: 1.8rem;
  color: black;
  margin-left: 40px;
`;
const ChatLable = styled.span`
  text-transform: uppercase;
  position: absolute;
  display: inline-block;
  width: 90px;
  height: 50px;
  color: black;
  padding: 38px 0 0 0;
  font-size: 0.8rem;
  font-weight: bold;
  bottom: -20px;
  left: 38px;
  opacity: 0;
  transition: all 300ms ease-in;
  &:hover {
    opacity: 1;
    transform: translateY(-10px);
  }
`;
const StyledAiOutlineLogout = styled(AiOutlineLogout)`
  font-size: 1.8rem;
`;
