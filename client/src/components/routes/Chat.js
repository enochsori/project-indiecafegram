import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Conversation from '../chat/Converstaion';
import Message from '../chat/Message';

const Chat = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Wrapper>
      {/* Chat groups */}
      <ChatMenu>
        <ChatMenuWrapper>
          <ChatMenuInput placeholder='"Search for cafes' />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </ChatMenuWrapper>
      </ChatMenu>

      {/* Main chat box */}
      <ChatBox>
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
      </ChatBox>

      {/* Current Online users */}
      <ChatOnline>
        <ChatOnlineWrapper></ChatOnlineWrapper>
      </ChatOnline>
    </Wrapper>
  );
};

export default Chat;

const Wrapper = styled.div`
  display: flex;
  margin-top: 70px;
  height: 100vh;
`;
// ------------------------------
// Sidebar displaying chat groups
const ChatMenu = styled.div`
  flex: 2.5;
  /* border: 1px solid black; */
  height: 780px;
  overflow-y: scroll;
  background-color: #fff;
`;
const ChatMenuWrapper = styled.div``;
const ChatMenuInput = styled.input`
  width: 90%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid gray;
`;
// ------------------------------

// ------------------------------
// Chat box
const ChatBox = styled.div`
  flex: 7.5;
  /* border: 1px solid red; */
`;
const ChatBoxWrapper = styled.div`
  background-color: #fff;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 780px;
`;
const ChatBoxTop = styled.div`
  padding-right: 15px;
  height: 100%;
  overflow-y: scroll;
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

// ------------------------------

// ------------------------------
// Current Online users
const ChatOnline = styled.div`
  float: 2;
`;
const ChatOnlineWrapper = styled.div``;
