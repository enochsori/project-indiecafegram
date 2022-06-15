import styled from 'styled-components';
import { useContext, useState, useRef } from 'react';
import { UserContext } from '../UserContext';
import noAvatar from '../../images/noAvatar.png';
import { useNavigate } from 'react-router-dom';
import cafe from '../../images/cafe.jpeg';
import { async } from '@firebase/util';

const AddCafe = () => {
  const [newName, setNewName] = useState(null);
  const [newAddress, setNewAddress] = useState(null);
  const [newPhone, setNewPhone] = useState(null);
  const [newWebSite, setNewWebSite] = useState(null);

  const inputCleanHandler = () => {
    setNewName('');
    setNewAddress('');
    setNewPhone('');
    setNewWebSite('');
  };
  const addCafeHandler = (event) => {
    event.preventDefault();
    const addCafe = async () => {
      try {
        const res = await fetch('');

        // Clean inputs
        inputCleanHandler();
      } catch (err) {
        console.loge(err);
      }
    };
  };
  return (
    <AddCafeBackground>
      <Wrapper>
        <AddCafeImage src={cafe} />
        <ContentWrapper>
          <Title>Add hidden indiecafé</Title>
          <AddForm onSubmit={addCafeHandler}>
            <NameInput
              value={newName}
              placeholder='café name'
              type='text'
              required
              onChange={(event) => setNewName(event.target.value)}
            />
            <AddressInput
              value={newAddress}
              placeholder='café address'
              type='text'
              required
              onChange={(event) => setNewAddress(event.target.value)}
            />

            <PhoneInput
              value={newPhone}
              placeholder='café phone number'
              type='text'
              required
              onChange={(event) => setNewPhone(event.target.value)}
            />
            <WebSiteInput
              value={newWebSite}
              placeholder='café website'
              type='text'
              required
              onChange={(event) => setNewWebSite(event.target.value)}
            />
            <SubmitButton>Submit</SubmitButton>
          </AddForm>
        </ContentWrapper>
      </Wrapper>
    </AddCafeBackground>
  );
};

export default AddCafe;

const AddCafeBackground = styled.div`
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
  border-radius: 5px;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;
const AddCafeImage = styled.img`
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;
const Title = styled.div`
  font-size: 2.3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;
const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
const NameInput = styled.input`
  border: none;
  height: 45px;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;
const AddressInput = styled.input`
  border: none;
  height: 45px;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const PhoneInput = styled.input`
  border: none;
  height: 45px;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;
const WebSiteInput = styled.input`
  border: none;
  height: 45px;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-bottom: 70px;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 5px;
  height: 60px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  background: #1dad9b;
  cursor: pointer;

  transition: all 200ms ease-in;
  &:hover {
    background-color: #2470a0;
  }
`;
