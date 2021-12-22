import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messagesActions } from '../../../app/slices/messagesSlice';
import { userSelectedActions } from '../../../app/slices/selectUserSlice';
import { auth, db } from '../../../firebase/firebase-config';
import userNameShort from '../../../helpers/getUserNameShort';
import UserViewProfile from './user-view-profile/UserViewProfile';
const User = ({ user }) => {
  const [data, setData] = useState(null);

  const userSelected = useSelector((state) => state.userSeleted);
  const user2 = user?.uid;
  const user1 = auth.currentUser.uid;
  const dispatch = useDispatch();
  const getMessages = async (user) => {
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const messagesRef = collection(db, 'messages', id, 'chat');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    onSnapshot(q, (querySnapshot) => {
      let messagesDb = [];
      querySnapshot.forEach((doc) => {
        messagesDb.push(doc.data());
      });
      console.log();
      const messagesParse = messagesDb.map((message) => {
        return {
          ...message,
          createdAt: new Date(message.createdAt.seconds * 1000).toDateString(),
        };
      });
      dispatch(messagesActions.messagesLoad(messagesParse));
    });
    const docSnap = await getDoc(doc(db, 'lastMessage', id));
    if (docSnap.exists()) {
      if (docSnap.data().from !== user1) {
        await updateDoc(doc(db, 'lastMessage', id), {
          unread: false,
        });
      }
    }
  };
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, 'lastMessage', id), (doc) => {
      if (doc.exists) {
        setData(doc.data());
      }
    });
    return () => unsub();
  }, [user1, user2]);
  return (
    <div
      onClick={() => {
        dispatch(
          userSelectedActions.userSelected({
            ...user,
            createdAt: new Date(user.createdAt.seconds * 1000).toDateString(),
          })
        );
        getMessages(user);
      }}
      className={`user ${userSelected?.uid === user.uid && 'selected'} ${
        data?.from !== user1 && data?.unread && 'new-message'
      }`}
    >
      <UserViewProfile user={user} userName={userNameShort(user)} />
      <div className='user-message'>
        {data?.from !== user1 && data?.unread && (
          <small className='new'>New</small>
        )}
        <small className=''>{data?.from === user1 && 'Me:'}</small>
        <p style={{ marginTop: '5px' }}>{data?.text || 'No Messages'}</p>
      </div>
    </div>
  );
};

export default User;
