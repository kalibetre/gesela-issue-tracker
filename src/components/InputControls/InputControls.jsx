import React from 'react';
import './InputControls.css';

export const Input = (props) => {
    return (
        <div className="input-container">
            <label htmlFor={props.id}>{props.label}</label>
            <input {...props} />
        </div>
    );
};

export const TextArea = (props) => {
    return (
        <div className="input-container">
            <label htmlFor={props.id}>{props.label}</label>
            <textarea {...props} />
        </div>
    );
};

export const Select = (props) => {
    return (
        <div className="input-container">
            <label htmlFor={props.id}>{props.label}</label>
            <select {...props}>{props.children}</select>
        </div>
    );
};

export const Option = (props) => {
    return <option {...props}>{props.children}</option>;
};
