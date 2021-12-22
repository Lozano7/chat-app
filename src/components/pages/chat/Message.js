import React from 'react';
import Moment from 'react-moment';
import { auth } from '../../../firebase/firebase-config';
const Message = ({ message }) => {
  return (
    <div
      className={`message-wrapper ${
        message.from === auth.currentUser.uid && 'user1-align'
      }`}
    >
      <div
        className={`message-content ${
          message.from === auth.currentUser.uid && 'user1'
        }`}
      >
        {message.media && (
          <a href={message.media} target='_Blank' rel='noreferrer'>
            <img className='img-media' src={message.media} alt='message' />
          </a>
        )}
        <p>{message.text}</p>
        <small>
          <Moment fromNow>{message.createAt}</Moment>
        </small>
      </div>
    </div>
  );
};

export default Message;
