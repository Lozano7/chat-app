import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const Messages = () => {
  const messages = useSelector((state) => state.message);
  return (
    <div className='messages'>
      {messages.map((message, i) => (
        <Message
          key={`${i} - ${new Date().getTime()} - ${message.createdAt}`}
          message={message}
        />
      ))}
    </div>
  );
};

export default Messages;
