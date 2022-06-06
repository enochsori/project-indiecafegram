import { initializeApp } from 'firebase/app';

// const {
//   REACT_APP_FIREBASE_API_KEY,
//   REACT_APP_AUTH_DOMAIN,
//   REACT_APP_PROJECT_ID,
//   REACT_APP_STORAGE_BUCKET,
//   REACT_APP_MESSAGING_SENDER_ID,
//   REACT_APP_FIREBASE_APP_ID,
// } = process.env;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC9XqE5aQPX25P0-7WD11yDZaGiv1p299o',
  authDomain: 'indiecafegram.firebaseapp.com',
  projectId: 'indiecafegram.appspot.com',
  storageBucket: 'indiecafegram.appspot.com',
  messagingSenderId: '851694623392',
  appId: '1:851694623392:web:2013cbda6e95f9334e07c5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export app
export default app;
