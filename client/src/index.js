import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import CafeProvider from './components/CafeContext';
import ChatProvider from './components/ChatContext';
import UserProvider from './components/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <CafeProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </CafeProvider>
    </UserProvider>
  </React.StrictMode>
);
