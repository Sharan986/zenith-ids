import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange, required = false, id }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input
        id={id}
        type={type}
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
