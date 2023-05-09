import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button
            className={props.primary ? 'btn-primary' : 'btn-default'}
            {...props}
        >
            {props.children}
        </button>
    );
};

export default Button;
