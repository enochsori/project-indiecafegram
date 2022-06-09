import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import CafeProvider from './components/CafeContext';
import UserProvider from './components/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <CafeProvider>
        <App />
      </CafeProvider>
    </UserProvider>
  </React.StrictMode>
);
