import { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChatContext } from '../ChatContext';
import Conversation from '../chat/Converstaion';
import Message from '../chat/Message';
import { async } from '@firebase/util';

const Chat = () => {
  const scrollRef = useRef();
  const inputRef = useRef();
  const [newChat, setNewChat] = useState(null);
  const [user, setUser] = useState(null);

  const {
    conversations,
    setConversations,
    setCurrentChat,
    currentUser,
    currentChat,
    newMessage,
    setNewMessage,
    messages,
    setMessages,
  } = useContext(ChatContext);

  console.log(user, currentUser);

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      try {
        const _id = window.localStorage.getItem('userId');
        const res = await fetch(`/api/users/${_id}`);
        const userData = await res.json();
        console.log(userData);
        if (userData) {
          const { data } = userData;
          setUser(data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  // Get all chat group info
  useEffect(() => {
    const getConversations = async () => {
      const res = await fetch('/api/conversations');
      const { data } = await res.json();
      setConversations(data);
    };
    getConversations();
  }, []);

  // get messages of selected chat group
  useEffect(() => {
    const _id = currentChat._id;
    const getMessagesById = async () => {
      const res = await fetch(`/api/conversations/${_id}`);
      const chatData = await res.json();
      if (chatData) {
        const { data } = chatData;
        console.log(data);
        setMessages(data[0].text);
      }
    };
    getMessagesById();
  }, [currentChat]);

  // Submit new Chat to BE and database
  const submitHandler = async (event) => {
    event.preventDefault();

    console.log(currentUser);

    const now = new Date();

    try {
      const res = await fetch('/api/add-chat-message', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: currentChat._id,
          name: user.name,
          text: newMessage,
          createdAt: now,
        }),
      });
      const result = await res.json();
      console.log(result);
      inputRef.current.value = '';
      setNewChat(result);
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
                {messages.map((message) => (
                  <div
                    key={Math.floor(Math.random() * 4000000)}
                    ref={scrollRef}
                  >
                    <Message
                      key={Math.floor(Math.random() * 4000000)}
                      message={message}
                    />
                  </div>
                ))}
              </ChatBoxTop>

              <ChatBoxBottom onSubmit={submitHandler}>
                <ChatMessageInput
                  ref={inputRef}
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
