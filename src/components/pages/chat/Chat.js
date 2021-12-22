import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth, db } from '../../../firebase/firebase-config';
import './chat.css';
import ChatMessage from './chatMessage/ChatMessage';
import UsersList from './UsersList';
const Chat = () => {
  const [users, setUsers] = useState([]);
  const userSelected = useSelector((state) => state.userSeleted);
  useEffect(() => {
    const userRef = collection(db, 'users');
    //create query object
    const q = query(userRef, where('uid', 'not-in', [auth.currentUser.uid]));
    //execute query
    const unsub = onSnapshot(q, (querySnapchot) => {
      let users = [];
      querySnapchot.forEach((doc) => {
        users = [...users, doc.data()];
      });
      setUsers(users);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className='chat'>
      {users.length === 0 || <UsersList users={users} />}
      {userSelected ? (
        <ChatMessage />
      ) : (
        <div className='message-default'>
          <h2>Select a user to start a chat</h2>
        </div>
      )}
    </div>
  );
};

export default Chat;
