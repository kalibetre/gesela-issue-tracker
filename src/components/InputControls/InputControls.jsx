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
	)
}
