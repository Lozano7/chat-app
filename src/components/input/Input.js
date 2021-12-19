import React from 'react';

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  pattern,
  title,
}) => {
  return (
    <div className='mb-3'>
      <input
        type={type}
        className='form-control'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        pattern={pattern}
        title={title}
      />
    </div>
  );
};

export default Input;
