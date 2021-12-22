// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyASd5khpwftBgl7RfiwQ-sIV10QxVOzkt0',
  authDomain: 'react-chat-app-e9526.firebaseapp.com',
  databaseURL: 'https://react-chat-app-e9526.firebaseio.com',
  projectId: 'react-chat-app-e9526',
  storageBucket: 'react-chat-app-e9526.appspot.com',
  messagingSenderId: '680005217065',
  appId: '1:680005217065:web:0dab2133fe3fcb7f33a538',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
