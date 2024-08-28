import React from 'react';
import '../styles/Input.css';

const Input = ({ type, id, name, placeholder, value, onChange, required }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        id={id}
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {type === 'tel' && <small className="form-text text-muted">+38 (XXX) XXX - XX - XX</small>}
    </div>
  );
};

export default Input;
