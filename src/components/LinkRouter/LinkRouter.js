import React from 'react';
import { Link } from 'react-router-dom';

const LinkRouter = ({ className, to, text }) => {
  return (
    <Link className={`${className}`} to={to}>
      {text}
    </Link>
  );
};

export default LinkRouter;
