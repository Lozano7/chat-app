import React from 'react';
import Attachment from '../../svg/Attachment';

const MessageForm = ({ handleSumit, text, setText, img, setImg }) => {
  return (
    <form className='message_form' onSubmit={handleSumit}>
      <label htmlFor='img'>
        <Attachment />
      </label>
      <input
        type='file'
        id='img'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={(e) => setImg(e.target.files[0])}
      />
      <div className='input-message'>
        <input
          type='text'
          placeholder='Enter Message...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button
          className='btn 
        '
          type='submit'
        >
          <i className='bx bxs-send send-color'></i>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
