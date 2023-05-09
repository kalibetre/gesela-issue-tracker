import React from 'react';
import './Input.css';

const Input = (props) => {
    return (
        <div className="input-container">
            <label htmlFor={props.id}>{props.label}</label>
            <input {...props} />
        </div>
    );
};

export default Input;
