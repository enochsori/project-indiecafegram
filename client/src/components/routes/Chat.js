import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ChatContext } from '../ChatContext';
import Conversation from '../chat/Converstaion';
import Message from '../chat/Message';
import { getCurrentUser } from '../../../../server/handler';

const Chat = () => {
  const scrollRef = useRef();
  const [isNewChat, setIsNewChat] = useState(false);

  const {
    conversations,
    setConversations,
    setCurrentChat,
    currentChat,
    newMessage,
    setNewMessage,
  } = useContext(ChatContext);

  useEffect(() => {
    const getConversations = async () => {
      const res = await fetch('/api/conversations');
      const { data } = await res.json();
      setConversations(data);
    };
    getConversations();
  }, [isNewChat]);

  // Submit new Chat to BE and database
  const submitHandler = async (event) => {
    event.preventDefault();
    const now = new Date();

    try {
      const res = await fetch('/add-chat-message', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: currentChat._id,
          name: getCurrentUser[0].name,
          text: newMessage,
          createdAt: now,
        }),
      });
      const result = await res.json();
      console.log(result);
      setIsNewChat(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations]);

  return (
    <Wrapper>
      {/* Chat groups */}
      <ChatMenu>
        <ChatMenuWrapper>
          <ChatMenuInput placeholder='Search for chat groups' />
          {conversations &&
            conversations.map((conv) => (
              <div
                key={Math.floor(Math.random() * 4000000)}
                onClick={() => setCurrentChat(conv)}
              >
                <Conversation conversation={conv} />
              </div>
            ))}
        </ChatMenuWrapper>
      </ChatMenu>

      {/* Main chat box */}
      <ChatBox>
        <ChatBoxWrapper>
          {currentChat ? (
            <>
              <ChatBoxTop>
                {currentChat.text.map((chat) => (
                  <div
                    key={Math.floor(Math.random() * 4000000)}
                    ref={scrollRef}
                  >
                    <Message
                      key={Math.floor(Math.random() * 4000000)}
                      chat={chat}
                    />
                  </div>
                ))}
              </ChatBoxTop>

              <ChatBoxBottom onSubmit={submitHandler}>
                <ChatMessageInput
                  onChange={(event) => {
                    setNewMessage(event.target.value);
                  }}
                  placeholder='Write something..'
                ></ChatMessageInput>
                <ChatSumbitButton>Submit</ChatSumbitButton>
              </ChatBoxBottom>
            </>
          ) : (
            <NoConversationText>
              Choose a cafe chat group to start a chat
            </NoConversationText>
          )}
        </ChatBoxWrapper>
      </ChatBox>
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
const ChatBoxBottom = styled.form`
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

const NoConversationText = styled.span`
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: rgb(224, 220, 220);
  cursor: default;
  text-align: center;
`;
