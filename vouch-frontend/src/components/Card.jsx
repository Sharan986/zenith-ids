import React from 'react';

const Card = ({ children, className = '', hoverable = true }) => {
  return (
    <div className={`card ${hoverable ? '' : 'no-hover'} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
