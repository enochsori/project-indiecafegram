import { useState, createContext } from 'react';
import { DefaultContext } from 'react-icons/lib';

export const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        currentChat,
        setCurrentChat,
        messages,
        setMessages,
        newMessage,
        setNewMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
