import styled from 'styled-components';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import noAvatar from '../../images/noAvatar.png';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  // console.log(currentUser);
  const navigate = useNavigate(null);

  const editHandler = () => {
    navigate('/edit-profile');
  };

  return (
    <ProfileBackground>
      <Wrapper>
        <ProfileImage src={noAvatar} />
        <ContentWrapper>
          <Title>User Profile</Title>
          {currentUser && (
            <>
              <ProfileWrapper>
                <NameWrapper>
                  <NameLable>Name</NameLable>
                  <Name> {currentUser.name}</Name>
                </NameWrapper>

                <EmailWrapper>
                  <EmailLable>Email</EmailLable>
                  <Email>{currentUser.email}</Email>
                </EmailWrapper>
              </ProfileWrapper>

              <EditButton onClick={editHandler}>Edit</EditButton>
            </>
          )}
        </ContentWrapper>
      </Wrapper>
    </ProfileBackground>
  );
};

export default Profile;

const ProfileBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 1360px;
  height: 100vh;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;
const Wrapper = styled.div`
  margin-top: 200px;
  background: #dfebed;
  width: 800px;
  height: 500px;
  display: flex;
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;
const ProfileImage = styled.img`
  background-color: #fff;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  flex: 4;
`;
const Title = styled.div`
  font-size: 2.3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const ProfileWrapper = styled.div`
  /* border: 1px solid blue; */
  height: 500px;
`;

const NameWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 5px;
  background-color: #f8f8f8;
  margin-bottom: 20px;
`;

const NameLable = styled.div`
  font-size: 1.5rem;
  width: 30%;
`;
const Name = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const EmailWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 5px;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  margin-bottom: 80px;
`;

const EmailLable = styled.div`
  font-size: 1.5rem;
  width: 30%;
`;

const Email = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;
const EditButton = styled.button`
  border: none;
  border-radius: 5px;
  height: 60px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  background: #1dad9b;
  transition: all 200ms ease-in;
  &:hover {
    background-color: #2470a0;
  }

  cursor: pointer;
`;
