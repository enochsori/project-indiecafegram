import { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../UserContext';
import { getAuth, signOut } from 'firebase/auth';

const Header = () => {
  const { currentUser } = useContext(UserContext);
  const { setUserId } = useContext(UserContext);
  const auth = getAuth();

  const logoutHandler = async () => {
    // Call signout from firebase
    await signOut(auth);
    // Delete localstorage data
    window.localStorage.removeItem('userId');

    setUserId(null);
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <Title>Indicafegram</Title>
        {currentUser && <Title>{currentUser[0].name}</Title>}
        <button onClick={logoutHandler}>Log out</button>
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
  background-color: #fff;
  z-index: 10;

  z-index: 100;
`;
const ContentWrapper = styled.div`
  z-index: 90;
  background-color: #fff;
  position: fixed;
  height: 68px;
  width: 1450px;
`;
const Title = styled.span``;
const menuWrapper = styled.ul``;
