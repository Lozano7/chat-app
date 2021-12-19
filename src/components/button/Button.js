import React from 'react';

const Button = ({ btnColor, text, disable = false, onClick }) => {
  return (
    <div className='d-flex justify-content-center'>
      <button
        className={`btn ${btnColor}`}
        disabled={disable}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
