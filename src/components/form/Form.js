import React from 'react';

const Form = ({ children, onSubmit }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='mb-0'>{children}</div>
      </form>
    </>
  );
};

export default Form;
