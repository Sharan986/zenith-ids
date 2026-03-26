import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  to, 
  onClick, 
  className = '', 
  type = 'button',
  icon: Icon
}) => {
  const baseClass = `btn btn-${variant} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClass}>
        {Icon && <Icon size={18} />}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClass}>
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
