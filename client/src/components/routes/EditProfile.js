import styled from 'styled-components';
import { useContext, useRef } from 'react';
import { UserContext } from '../UserContext';
import noAvatar from '../../images/noAvatar.png';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { currentUser, setUserId } = useContext(UserContext);
  // console.log(currentUser);
  const inputRef = useRef(null);
  const navigate = useNavigate(null);

  const editSubmitHandler = () => {
    const name = inputRef.current.value;
    const updateProfile = async () => {
      try {
        const res = await fetch(`/api/edit-profile`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: currentUser._id,
            name,
          }),
        });
        const { data } = await res.json();
        // update currentUser and move to home
        if (data) {
          setUserId(currentUser._id);
          navigate('/profile');
        }
      } catch (err) {
        console.log(err);
      }
    };
    updateProfile();
  };

  return (
    <ProfileBackground>
      <Wrapper>
        <ProfileImage src={noAvatar} />
        <ContentWrapper>
          <Title>User Profile</Title>
          {currentUser && (
            <EditForm onSubmit={editSubmitHandler}>
              <ProfileWrapper>
                <NameWrapper>
                  <NameLable>Name</NameLable>
                  <Name
                    ref={inputRef}
                    type='text'
                    required
                    placeholder='Write your name'
                  />
                </NameWrapper>

                <EmailWrapper>
                  <EmailLable>Email</EmailLable>
                  <Email>{currentUser.email}</Email>
                </EmailWrapper>
              </ProfileWrapper>

              <EditButton>Submit</EditButton>
            </EditForm>
          )}
        </ContentWrapper>
      </Wrapper>
    </ProfileBackground>
  );
};

export default EditProfile;

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

const EditForm = styled.form`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
const Name = styled.input`
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  width: 70%;
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
