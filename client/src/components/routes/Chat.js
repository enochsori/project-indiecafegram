import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from '../message/Message';

const Chat = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Wrapper>
      <ChatBoxWrapper>
        <ChatBoxTop>
          <Message user={false} />
          <Message user={true} />
          <Message user={false} />
          <Message user={true} />
          <Message user={false} />
          <Message user={false} />
          <Message user={false} />
          <Message user={true} />
          <Message user={false} />
          <Message user={true} />
          <Message user={false} />
          <Message user={true} />
          <Message user={false} />
          <Message user={true} />
          <Message user={false} />
          <Message user={true} />
          <Message user={false} />
          <Message user={true} />
        </ChatBoxTop>

        <ChatBoxBottom>
          <ChatMessageInput
            ref={inputRef}
            placeholder='Write something..'
          ></ChatMessageInput>
          <ChatSumbitButton>Submit</ChatSumbitButton>
        </ChatBoxBottom>
      </ChatBoxWrapper>
    </Wrapper>
  );
};

export default Chat;

const Wrapper = styled.div`
  width: 850px;
  background-color: #fff;
`;

const ChatBoxWrapper = styled.div`
  padding: 20px 15px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;
const ChatBoxTop = styled.div`
  overflow-y: scroll;
  height: 100%;
`;
const ChatBoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 15px;
`;
const ChatMessageInput = styled.textarea`
  width: 80%;
  height: 90px;
  padding: 10px;
  border-radius: 5px;
`;
const ChatSumbitButton = styled.button`
  border: none;
  border-radius: 5px;
  width: 90px;
  height: 40px;
  cursor: pointer;
  background-color: #2470a0;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 200ms ease-in;
  &:hover {
    background-color: #1dad9b;
  }
`;
