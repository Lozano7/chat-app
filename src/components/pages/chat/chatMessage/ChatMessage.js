import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { auth, db, storage } from '../../../../firebase/firebase-config';
import userNameShort from '../../../../helpers/getUserNameShort';
import MessageForm from '../MessageForm';
import Messages from '../Messages';
import UserViewProfile from '../user-view-profile/UserViewProfile';
import './chatmessage.css';
const ChatMessage = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const userSelected = useSelector((state) => state.userSeleted);

  const user1 = auth.currentUser.uid;
  const handleSumit = async (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      const user2 = userSelected.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
      let url;
      if (img) {
        const imgRef = ref(
          storage,
          `images/${new Date().getTime()} - ${img.name}`
        );
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }
      await addDoc(collection(db, 'messages', id, 'chat'), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || '',
      });
      await setDoc(doc(db, 'lastMessage', id), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || '',
        unread: true,
      });
      setText('');
    }
  };

  return (
    <section className='chat__text'>
      <nav className='nav-chat'>
        <UserViewProfile
          user={userSelected}
          userName={userNameShort(userSelected)}
        />
        <div className='content-info'>
          <h4>{userSelected.isOnline ? 'Online' : 'Offline'}</h4>
        </div>
      </nav>
      <Messages />
      <MessageForm
        handleSumit={handleSumit}
        text={text}
        setText={setText}
        img={img}
        setImg={setImg}
      />
    </section>
  );
};

export default ChatMessage;
