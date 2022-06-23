import { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../UserContext';

const Message = ({ message }) => {
  console.log(message);
  const { currentUser } = useContext(UserContext);
  const user = currentUser.name === Object.keys(message)[0] ? true : false;

  return (
    <Wrapper user={user ? true : false}>
      <MessageTop>
        <MessageImg user={user ? true : false}>
          {Object.keys(message)[0]}
        </MessageImg>
        <MessageText user={user ? true : false}>
          {Object.values(message)[0]}
        </MessageText>
      </MessageTop>
      <MessageTime>{message.createdAt}</MessageTime>
    </Wrapper>
  );
};

export default Message;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: ${(p) => (p.user ? `flex-end` : 'flex-start')};
`;

const MessageTop = styled.div`
  display: flex;
  align-items: center;
`;

const MessageImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(p) => (p.user ? 'blue' : 'red')};
  text-align: center;
  padding-top: 9px;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 10px;
  text-transform: uppercase;
`;
const MessageText = styled.p`
  padding: 15px;
  border-radius: 20px;
  background-color: ${(p) => (p.user ? `#e7eaf6` : '#1877f2')};
  color: ${(p) => (p.user ? `black` : '#fff')};
  max-width: 500px;
`;
const MessageTime = styled.div`
  font-size: 12px;
  margin: 10px;
`;
